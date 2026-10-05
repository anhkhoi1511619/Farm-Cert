#!/usr/bin/env python3
"""Turn actionable Jira comments into isolated code changes and pull requests.

The program polls Jira, lets any author trigger the workflow, and uses Codex
to interpret and implement the requested source change.  Each execution uses
a fresh Git branch/worktree, pushes that branch, and creates a GitHub PR.
"""

import argparse
import os
import re
import shutil
import subprocess
import sys
import tempfile
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
_AUTOMATION_PREFIX = "đã tạo pr tự động:"


def run(command, cwd=None, env=None, check=True, capture=True):
    print("$ " + " ".join(str(part) for part in command), flush=True)
    result = subprocess.run(
        command,
        cwd=str(cwd) if cwd else None,
        env=env,
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
    root = Path(__file__).resolve().parents[2]
    python = sys.executable
    codex_exe = os.getenv("CODEX_EXE") or shutil.which("codex") or "codex"
    base_branch = os.getenv("CODEX_BASE_BRANCH", "main")
    return root, python, codex_exe, base_branch


def actionable(text):
    normalized = " " + " ".join(text.lower().split()) + " "
    if not normalized.strip() or _NON_ACTIONABLE.match(normalized.strip()):
        return False
    if normalized.strip().startswith(_AUTOMATION_PREFIX):
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


def codex_edit(codex_exe, worktree, context, comment, output_file):
    prompt = f"""You are implementing a requested change in a Git repository.

{context}

New Jira comment:
{comment}

Interpret the comment in context and modify the source code to fulfill it. Inspect the repository before editing. Keep the change focused, do not edit .env or secrets, and run the most relevant available tests or checks. Do not create a branch, commit, push, or open a pull request; leave the changes in this worktree. If the comment is not a concrete code request, make no changes and explain why in your final response."""
    run([
        codex_exe, "exec", "--cd", str(worktree), "--approve-for-me",
        "--ephemeral", "-o", str(output_file), prompt,
    ], cwd=worktree)


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


def create_pr(python, root, branch, base_branch, issue_key, comment, codex_output):
    title = f"Implement request from {issue_key}"
    body = (
        f"Automated implementation requested by a Jira comment on {issue_key}.\n\n"
        f"Comment:\n{comment}\n\n"
        "Codex implementation summary:\n" + codex_output[-4000:]
    )
    github_tool = root / "codex" / "api-github" / "github_tool.py"
    result = run([
        python, str(github_tool), "create-pr", "--head", branch,
        "--base", base_branch, "--title", title, "--body", body,
    ], cwd=root)
    match = re.search(r"URL:\s*(\S+)", result.stdout)
    return match.group(1) if match else "(PR URL unavailable; inspect GitHub output)"


def process_comment(root, python, codex_exe, base_branch, issue, comment, dry_run=False):
    comment_text = jira.flatten_adf(comment.get("body", {})).strip()
    if not actionable(comment_text):
        print(f"[{issue['key']}] ignored non-actionable comment.", flush=True)
        return False

    issue_key = issue["key"]
    branch = f"codex/{issue_key.lower()}-comment-{int(time.time())}"
    worktree = Path(tempfile.mkdtemp(prefix=f"jira-{issue_key.lower()}-"))
    output_handle, output_name = tempfile.mkstemp(prefix="codex-last-message-", suffix=".txt")
    os.close(output_handle)
    output_file = Path(output_name)
    worktree_added = False
    try:
        comments = jira.issue_comments(issue_key)
        context = issue_context(issue, comments)
        print(f"[{issue_key}] actionable comment from {(comment.get('author') or {}).get('displayName', 'Unknown')}.", flush=True)
        if dry_run:
            print(f"[{issue_key}] DRY RUN: would set In Progress, create {branch}, run Codex, push, and create PR.", flush=True)
            return True

        # Status is changed before implementation so Jira reflects active work.
        run([python, str(root / "codex" / "api-jira" / "jira_tool.py"), "status", issue_key, "In Progress"], cwd=root)
        create_branch(root, branch, base_branch, worktree)
        worktree_added = True
        codex_edit(codex_exe, worktree, context, comment_text, output_file)
        files = changed_files(worktree)
        if not files:
            raise RuntimeError("Codex produced no source changes; PR was not created.")
        run(["git", "add", "-A"], cwd=worktree)
        run(["git", "reset", "--", ".env"], cwd=worktree, check=False)
        run(["git", "commit", "-m", f"Implement Jira request {issue_key}"], cwd=worktree)
        run(["git", "push", "--set-upstream", "origin", branch], cwd=worktree)
        summary = output_file.read_text(encoding="utf-8", errors="replace") if output_file.exists() else ""
        pr_url = create_pr(python, root, branch, base_branch, issue_key, comment_text, summary)
        run([python, str(root / "codex" / "api-jira" / "jira_tool.py"), "comment", issue_key, f"Đã tạo PR tự động: {pr_url}"], cwd=root)
        print(f"[{issue_key}] PR created: {pr_url}", flush=True)
        return True
    finally:
        if worktree_added:
            run(["git", "worktree", "remove", "--force", str(worktree)], cwd=root, check=False)
        shutil.rmtree(worktree, ignore_errors=True)
        output_file.unlink(missing_ok=True)


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
    root, python, codex_exe, base_branch = load_config()
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
                    process_comment(root, python, codex_exe, base_branch, issue, comment, args.dry_run)
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
                    process_comment(root, python, codex_exe, base_branch, issue, comment, args.dry_run)
            if args.once:
                return
    except KeyboardInterrupt:
        print("\nAuto PR watcher stopped.", flush=True)
    except (RuntimeError, OSError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
