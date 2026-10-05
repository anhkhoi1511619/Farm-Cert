#!/usr/bin/env python3
"""Create a code-changing GitHub PR from a Jira issue proposal.

The command reads a Jira issue and its comments, asks Codex to implement the
proposal in an isolated worktree, then pushes a new branch and creates a PR.
"""

import argparse
import base64
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


def load_dotenv():
    for directory in (Path(__file__).resolve().parent, *Path(__file__).resolve().parents):
        env_file = directory / ".env"
        if not env_file.is_file():
            continue
        for raw in env_file.read_text(encoding="utf-8").splitlines():
            line = raw.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))
        return


def jira_config():
    load_dotenv()
    email = os.getenv("JIRA_EMAIL") or os.getenv("EMAIL")
    token = os.getenv("JIRA_TOKEN")
    base = os.getenv("JIRA_BASE_URL", "https://anhkhoidev1511619.atlassian.net").rstrip("/")
    if not email or not token:
        raise RuntimeError("JIRA_EMAIL or EMAIL and JIRA_TOKEN are required")
    auth = base64.b64encode(f"{email}:{token}".encode()).decode()
    return base, {"Authorization": f"Basic {auth}", "Accept": "application/json", "Content-Type": "application/json"}


def jira_request(method, path, data=None, query=None):
    base, headers = jira_config()
    url = base + path
    if query:
        url += "?" + urllib.parse.urlencode(query)
    body = json.dumps(data).encode() if data is not None else None
    request = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            raw = response.read().decode()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as error:
        detail = error.read().decode(errors="replace")
        raise RuntimeError(f"Jira HTTP {error.code}: {detail}") from error


def flatten_adf(value):
    if isinstance(value, dict):
        return value.get("text", "") + "".join(flatten_adf(item) for item in value.get("content", []))
    if isinstance(value, list):
        return "".join(flatten_adf(item) for item in value)
    return value if isinstance(value, str) else ""


def get_issue(issue_key):
    encoded = urllib.parse.quote(issue_key)
    issue = jira_request("GET", f"/rest/api/3/issue/{encoded}", query={"fields": "summary,description,status"})
    comments = jira_request("GET", f"/rest/api/3/issue/{encoded}/comment", query={"orderBy": "created", "maxResults": 100}).get("comments", [])
    fields = issue.get("fields", {})
    lines = [f"Jira key: {issue_key}", f"Summary: {fields.get('summary', '')}", "Description:", flatten_adf(fields.get("description", {})).strip()]
    for comment in comments:
        author = (comment.get("author") or {}).get("displayName", "Unknown")
        text = flatten_adf(comment.get("body", {})).strip()
        if text:
            lines.append(f"Comment by {author}: {text}")
    return "\n".join(lines), fields.get("summary", issue_key)


def run(command, cwd, check=True):
    printable = " ".join(str(item) for item in command)
    print("$ " + printable, flush=True)
    result = subprocess.run(command, cwd=str(cwd), text=True, encoding="utf-8", errors="replace", capture_output=True)
    if result.stdout:
        print(result.stdout.rstrip(), flush=True)
    if result.stderr:
        print(result.stderr.rstrip(), file=sys.stderr, flush=True)
    if check and result.returncode:
        raise RuntimeError(f"Command failed with exit code {result.returncode}")
    return result


def set_status(root, python, issue_key):
    if not os.getenv("JIRA_EMAIL") and os.getenv("EMAIL"):
        os.environ["JIRA_EMAIL"] = os.environ["EMAIL"]
    run([
        python, str(root / "codex" / "api-jira" / "jira_tool.py"), "progress",
        issue_key, "70", "--note", "Pull request implementation is in progress.",
    ], root)


def create_pr(root, python, branch, base, issue_key, proposal, summary):
    github = root / "codex" / "api-github" / "github_tool.py"
    title = f"Fix {issue_key}: {summary}"
    body = f"## Jira proposal\n\n{proposal}\n\nJira: {issue_key}"
    result = run([python, str(github), "create-pr", "--head", branch, "--base", base, "--title", title, "--body", body], root)
    match = re.search(r"URL:\s*(\S+)", result.stdout)
    if not match:
        raise RuntimeError("GitHub tool did not return a PR URL")
    return match.group(1)


def changed_files(worktree):
    result = run(["git", "status", "--porcelain", "--untracked-files=all"], worktree)
    files = []
    for line in result.stdout.splitlines():
        if len(line) < 4 or line[:2] == "!!":
            continue
        path = line[3:].strip().strip('"')
        path = path.split(" -> ", 1)[-1]
        if path == ".env" or path.startswith(".env."):
            continue
        files.append(path)
    return files


def configure_git_identity(worktree):
    run(["git", "config", "user.name", "Info: Zz1511619zZ"], worktree)
    run(["git", "config", "user.email", "Zz1511619zZ@gmail.com"], worktree)


def add_jira_pr_link(root, python, issue_key, pr_url, branch):
    run([
        python, str(root / "codex" / "api-jira" / "jira_tool.py"), "link-pr",
        issue_key, pr_url, "--branch", branch, "--status", "Open",
    ], root)


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    parser = argparse.ArgumentParser(description="Create a GitHub PR from Jira implementation proposal")
    parser.add_argument("issue_key", nargs="?", default="KAN-7")
    parser.add_argument("--base", default=os.getenv("CODEX_BASE_BRANCH", "main"))
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    load_dotenv()
    if not os.getenv("JIRA_EMAIL") and os.getenv("EMAIL"):
        os.environ["JIRA_EMAIL"] = os.environ["EMAIL"]
    root = Path(__file__).resolve().parents[2]
    python = sys.executable
    codex = os.getenv("CODEX_EXE") or shutil.which("codex") or "codex"
    proposal, summary = get_issue(args.issue_key)
    print(proposal, flush=True)
    if args.dry_run:
        print(f"DRY RUN: would set {args.issue_key} to In Progress, create a branch, edit source, push, and open a PR.")
        return

    branch = f"codex/{args.issue_key.lower()}-jira-{int(time.time())}"
    worktree = Path(tempfile.mkdtemp(prefix=f"{args.issue_key.lower()}-pr-"))
    output_handle, output_name = tempfile.mkstemp(prefix="codex-pr-result-", suffix=".txt")
    os.close(output_handle)
    output_file = Path(output_name)
    worktree_added = False
    try:
        set_status(root, python, args.issue_key)
        run(["git", "fetch", "origin", args.base], root)
        run(["git", "worktree", "add", "-b", branch, str(worktree), f"origin/{args.base}"], root)
        worktree_added = True
        configure_git_identity(worktree)
        prompt = f"""Implement the requested Jira change in this repository.

{proposal}

Inspect the code and make the focused source changes required by the Jira proposal. Do not edit .env or secrets. Run the most relevant tests/checks available. Do not commit, push, create branches, or open PRs; leave the source changes in this worktree and summarize the implementation."""
        run([codex, "exec", "--cd", str(worktree), "--approve-for-me", "--ephemeral", "-o", str(output_file), prompt], worktree)
        files = changed_files(worktree)
        if not files:
            raise RuntimeError("Codex produced no source changes; PR was not created")
        run(["git", "add", "-A"], worktree)
        run(["git", "reset", "--", ".env"], worktree, check=False)
        run(["git", "commit", "-m", f"Implement Jira proposal {args.issue_key}"], worktree)
        run(["git", "push", "--set-upstream", "origin", branch], worktree)
        pr_url = create_pr(root, python, branch, args.base, args.issue_key, proposal, summary)
        add_jira_pr_link(root, python, args.issue_key, pr_url, branch)
        print(f"PR created: {pr_url}")
    finally:
        if worktree_added:
            run(["git", "worktree", "remove", "--force", str(worktree)], root, check=False)
        shutil.rmtree(worktree, ignore_errors=True)
        output_file.unlink(missing_ok=True)


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, OSError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        sys.exit(1)
