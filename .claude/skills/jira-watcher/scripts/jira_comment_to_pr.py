#!/usr/bin/env python3
"""Turn actionable Jira comments into isolated code changes and pull requests.

The program polls Jira, lets any author trigger the workflow, and runs Claude
Code headless (`claude -p`) to interpret and implement the requested source
change.  Each execution uses a fresh Git branch/worktree under .worktrees/,
pushes that branch, creates a GitHub PR and links it in Jira.

Comments written by automation (the AI disclaimer prefix) never trigger it.
"""

import argparse
import os
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path

import jira_comment_watcher as jira


ACTION_WORDS = (
    "fix", "bug", "refactor", "implement", "add", "remove", "change",
    "update", "rewrite", "improve", " sửa", "sửa", "tạo", "thêm",
    "xóa", "xoá", "đổi", "cập nhật", "refactor", "triển khai",
    "hãy thực hiện", "hãy sửa", "vui lòng sửa", "please fix",
    "please change", "please implement", "pull request", "tạo pr",
)
_NON_ACTIONABLE = re.compile(
    r"^(ok|okay|thanks|thank you|đồng ý|tôi đồng ý|ack|noted|đã rõ|👍|😂|lol)[.!\s]*$",
    re.IGNORECASE,
)
_AUTOMATION_PREFIXES = (
    "@đây là comment tự động",  # AI-authored comments from jira_tool.py
    "đã tạo pr tự động:",       # legacy automation comment
)
SKILLS_DIR = Path(__file__).resolve().parents[2]
JIRA_TOOL = SKILLS_DIR / "jira" / "scripts" / "jira_tool.py"
GITHUB_TOOL = SKILLS_DIR / "github-pr" / "scripts" / "github_tool.py"
DEFAULT_ALLOWED_TOOLS = "Bash(./gradlew:*),Bash(gradlew.bat:*),Bash(git status:*),Bash(git diff:*)"
GIT_NAME = os.getenv("GIT_COMMIT_NAME", "Info: Zz1511619zZ")
GIT_EMAIL = os.getenv("GIT_COMMIT_EMAIL", "Zz1511619zZ@gmail.com")


def run(command, cwd=None, env=None, check=True, capture=True, input_text=None):
    print("$ " + " ".join(str(part) for part in command), flush=True)
    result = subprocess.run(
        [str(part) for part in command],
        cwd=str(cwd) if cwd else None,
        env=env,
        input=input_text,
        text=True,
        encoding="utf-8",
        errors="replace",
        capture_output=capture,
    )
    if capture and result.stdout:
        print(result.stdout.rstrip(), flush=True)
    if capture and result.stderr:
        print(result.stderr.rstrip(), file=sys.stderr, flush=True)
    if check and result.returncode:
        raise RuntimeError(f"Command failed ({result.returncode}): {command[0]}")
    return result


def load_config():
    jira.load_dotenv()
    # The existing project .env uses EMAIL, while jira_tool.py uses JIRA_EMAIL.
    if not os.getenv("JIRA_EMAIL") and os.getenv("EMAIL"):
        os.environ["JIRA_EMAIL"] = os.environ["EMAIL"]
    root = Path(subprocess.run(
        ["git", "rev-parse", "--show-toplevel"], cwd=str(SKILLS_DIR),
        text=True, capture_output=True, check=True,
    ).stdout.strip())
    python = sys.executable
    claude_exe = os.getenv("CLAUDE_EXE") or shutil.which("claude") or "claude"
    base_branch = os.getenv("BASE_BRANCH", "main")
    return root, python, claude_exe, base_branch


def actionable(text):
    normalized = " " + " ".join(text.lower().split()) + " "
    if not normalized.strip() or _NON_ACTIONABLE.match(normalized.strip()):
        return False
    if normalized.strip().startswith(_AUTOMATION_PREFIXES):
        return False
    return any(word in normalized for word in ACTION_WORDS)


def issue_context(issue, comments):
    lines = [f"Jira issue: {issue['key']}", f"Summary: {issue.get('fields', {}).get('summary', '')}"]
    for comment in comments[-10:]:
        author = (comment.get("author") or {}).get("displayName", "Unknown")
        body = jira.flatten_adf(comment.get("body", {})).strip()
        if body:
            lines.append(f"{author}: {body}")
    return "\n".join(lines)


def create_branch(root, branch, base_branch, worktree):
    run(["git", "fetch", "origin", base_branch], cwd=root)
    run(["git", "worktree", "add", "-b", branch, str(worktree), f"origin/{base_branch}"], cwd=root)


def claude_edit(claude_exe, worktree, context, comment):
    prompt = f"""You are implementing a requested change in a Git repository.

{context}

New Jira comment:
{comment}

Interpret the comment in context and modify the source code to fulfill it. Inspect the repository before editing. Keep the change focused, do not edit .env or secrets, and run the most relevant available tests or checks. Do not create a branch, commit, push, or open a pull request; leave the changes in this worktree. If the comment is not a concrete code request, make no changes and explain why in your final response."""
    allowed = [tool.strip() for tool in os.getenv("CLAUDE_WATCHER_ALLOWED_TOOLS", DEFAULT_ALLOWED_TOOLS).split(",") if tool.strip()]
    # The prompt goes through stdin so multi-line text survives Windows .cmd shims.
    result = run(
        [claude_exe, "-p", "--permission-mode", "acceptEdits", "--allowedTools", *allowed],
        cwd=worktree, input_text=prompt,
    )
    return result.stdout or ""


def changed_files(worktree):
    result = run(["git", "status", "--porcelain", "--untracked-files=all"], cwd=worktree)
    files = []
    for line in result.stdout.splitlines():
        if not line or line[0:2] == "!!":
            continue
        path = line[3:].strip().strip('"')
        if " -> " in path:
            path = path.split(" -> ", 1)[1]
        if path == ".env" or path.startswith(".env."):
            continue
        files.append(path)
    return files


def create_pr(python, root, branch, base_branch, issue_key, comment, claude_output):
    title = f"Implement request from {issue_key}"
    body = (
        f"Automated implementation requested by a Jira comment on {issue_key}.\n\n"
        f"Comment:\n{comment}\n\n"
        "Claude implementation summary:\n" + claude_output[-4000:] + "\n\n"
        "🤖 Generated with [Claude Code](https://claude.com/claude-code)"
    )
    result = run([
        python, GITHUB_TOOL, "create-pr", "--head", branch,
        "--base", base_branch, "--title", title, "--body", body,
    ], cwd=root)
    match = re.search(r"URL:\s*(\S+)", result.stdout)
    return match.group(1) if match else "(PR URL unavailable; inspect GitHub output)"


def process_comment(root, python, claude_exe, base_branch, issue, comment, dry_run=False):
    comment_text = jira.flatten_adf(comment.get("body", {})).strip()
    if not actionable(comment_text):
        print(f"[{issue['key']}] ignored non-actionable comment.", flush=True)
        return False

    issue_key = issue["key"]
    branch = f"claude/{issue_key.lower()}-comment-{int(time.time())}"
    worktree = root / ".worktrees" / branch.split("/", 1)[1]
    worktree_added = False
    try:
        comments = jira.issue_comments(issue_key)
        context = issue_context(issue, comments)
        print(f"[{issue_key}] actionable comment from {(comment.get('author') or {}).get('displayName', 'Unknown')}.", flush=True)
        if dry_run:
            print(f"[{issue_key}] DRY RUN: would set In Progress, create {branch}, run Claude, push, and create PR.", flush=True)
            return True

        # Status is changed before implementation so Jira reflects active work.
        run([python, JIRA_TOOL, "progress", issue_key, "70",
             "--note", "Watcher is implementing a Jira comment request."], cwd=root)
        worktree.parent.mkdir(parents=True, exist_ok=True)
        create_branch(root, branch, base_branch, worktree)
        worktree_added = True
        run(["git", "config", "user.name", GIT_NAME], cwd=worktree)
        run(["git", "config", "user.email", GIT_EMAIL], cwd=worktree)
        summary = claude_edit(claude_exe, worktree, context, comment_text)
        files = changed_files(worktree)
        if not files:
            raise RuntimeError("Claude produced no source changes; PR was not created.")
        run(["git", "add", "-A"], cwd=worktree)
        run(["git", "reset", "--", ".env"], cwd=worktree, check=False)
        run(["git", "commit", "-m",
             f"Implement Jira request {issue_key}\n\nCo-Authored-By: Claude <noreply@anthropic.com>"], cwd=worktree)
        run(["git", "push", "--set-upstream", "origin", branch], cwd=worktree)
        pr_url = create_pr(python, root, branch, base_branch, issue_key, comment_text, summary)
        run([python, JIRA_TOOL, "link-pr", issue_key, pr_url, "--branch", branch, "--status", "Open"], cwd=root)
        print(f"[{issue_key}] PR created: {pr_url}", flush=True)
        return True
    finally:
        if worktree_added:
            run(["git", "worktree", "remove", "--force", str(worktree)], cwd=root, check=False)


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    parser = argparse.ArgumentParser(description="Turn actionable Jira comments into GitHub PRs")
    parser.add_argument("--interval", type=float, default=5.0)
    parser.add_argument("--jql", default=os.getenv("JIRA_WATCH_JQL", jira.DEFAULT_JQL))
    parser.add_argument("--include-existing", action="store_true")
    parser.add_argument("--once", action="store_true")
    parser.add_argument("--dry-run", action="store_true", help="Classify comments without Jira/GitHub mutations")
    args = parser.parse_args()
    if args.interval <= 0:
        parser.error("--interval must be greater than zero")
    root, python, claude_exe, base_branch = load_config()
    seen = set()
    try:
        issues = jira.current_issues(args.jql)
        print(f"[{jira.timestamp()}] Auto PR watcher: {len(issues)} issue(s), interval {args.interval:g}s.", flush=True)
        if not args.include_existing:
            for issue in issues:
                for comment in jira.issue_comments(issue["key"]):
                    seen.add(str(comment.get("id")))
            print(f"[{jira.timestamp()}] Baseline captured; existing comments suppressed.", flush=True)
        else:
            for issue in issues:
                for comment in jira.issue_comments(issue["key"]):
                    comment_id = str(comment.get("id"))
                    if comment_id in seen:
                        continue
                    seen.add(comment_id)
                    process_comment(root, python, claude_exe, base_branch, issue, comment, args.dry_run)
            if args.once:
                return
        while True:
            time.sleep(args.interval) if not args.once else None
            issues = jira.current_issues(args.jql)
            for issue in issues:
                for comment in jira.issue_comments(issue["key"]):
                    comment_id = str(comment.get("id"))
                    if comment_id in seen:
                        continue
                    seen.add(comment_id)
                    process_comment(root, python, claude_exe, base_branch, issue, comment, args.dry_run)
            if args.once:
                return
    except KeyboardInterrupt:
        print("\nAuto PR watcher stopped.", flush=True)
    except (RuntimeError, OSError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
