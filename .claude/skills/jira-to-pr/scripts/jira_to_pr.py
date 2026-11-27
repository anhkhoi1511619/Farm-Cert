#!/usr/bin/env python3
"""Jira issue -> isolated Git worktree -> GitHub pull request.

The source change itself is made by Claude in the current session, between
the two steps below:

  prepare KAN-7
      Print the Jira proposal, move the issue to 70% / In Progress and create a
      fresh branch claude/kan-7-<timestamp> checked out in .worktrees/.
  finalize KAN-7 --worktree PATH --summary "What changed"
      Commit the worktree changes (never .env), push, open a PR against the
      base branch, link the PR in Jira and remove the worktree.
  abort --worktree PATH
      Remove the worktree and its local branch without pushing anything.

Run from anywhere inside the repository. No third-party packages required.
"""

import argparse
import os
import re
import subprocess
import sys
import time
from pathlib import Path

SKILLS_DIR = Path(__file__).resolve().parents[2]
JIRA_TOOL = SKILLS_DIR / "jira" / "scripts" / "jira_tool.py"
GITHUB_TOOL = SKILLS_DIR / "github-pr" / "scripts" / "github_tool.py"
PYTHON = sys.executable
DEFAULT_BASE = os.getenv("BASE_BRANCH", "main")
GIT_NAME = os.getenv("GIT_COMMIT_NAME", "Info: Zz1511619zZ")
GIT_EMAIL = os.getenv("GIT_COMMIT_EMAIL", "Zz1511619zZ@gmail.com")


def run(command, cwd, check=True):
    print("$ " + " ".join(str(item) for item in command), flush=True)
    result = subprocess.run(
        [str(item) for item in command], cwd=str(cwd), text=True,
        encoding="utf-8", errors="replace", capture_output=True,
    )
    if result.stdout:
        print(result.stdout.rstrip(), flush=True)
    if result.stderr:
        print(result.stderr.rstrip(), file=sys.stderr, flush=True)
    if check and result.returncode:
        raise RuntimeError(f"Command failed with exit code {result.returncode}: {command[0]}")
    return result


def repo_root():
    result = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"], cwd=str(SKILLS_DIR),
        text=True, capture_output=True, check=True,
    )
    return Path(result.stdout.strip())


def changed_files(worktree):
    result = run(["git", "status", "--porcelain", "--untracked-files=all"], worktree)
    files = []
    for line in result.stdout.splitlines():
        if len(line) < 4 or line[:2] == "!!":
            continue
        path = line[3:].strip().strip('"').split(" -> ", 1)[-1]
        if path == ".env" or path.startswith(".env."):
            continue
        files.append(path)
    return files


def jira_summary(root, issue_key):
    output = run([PYTHON, JIRA_TOOL, "get", issue_key], root).stdout
    match = re.search(r"^Summary\s*:\s*(.+)$", output, re.MULTILINE)
    return match.group(1).strip() if match else issue_key


def prepare(args):
    root = repo_root()
    run([PYTHON, JIRA_TOOL, "context", args.issue_key], root)
    branch = f"claude/{args.issue_key.lower()}-{int(time.time())}"
    worktree = root / ".worktrees" / branch.split("/", 1)[1]
    if args.dry_run:
        print(f"DRY RUN: would set {args.issue_key} to 70% / In Progress and create {branch} at {worktree}.")
        return
    run([PYTHON, JIRA_TOOL, "progress", args.issue_key, "70",
         "--note", "Pull request implementation is in progress."], root)
    run(["git", "fetch", "origin", args.base], root)
    worktree.parent.mkdir(parents=True, exist_ok=True)
    run(["git", "worktree", "add", "-b", branch, worktree, f"origin/{args.base}"], root)
    run(["git", "config", "user.name", GIT_NAME], worktree)
    run(["git", "config", "user.email", GIT_EMAIL], worktree)
    print(f"BRANCH: {branch}")
    print(f"WORKTREE: {worktree}")


def finalize(args):
    root = repo_root()
    worktree = Path(args.worktree).resolve()
    branch = run(["git", "rev-parse", "--abbrev-ref", "HEAD"], worktree).stdout.strip()
    if not branch.startswith("claude/"):
        raise RuntimeError(f"Refusing to finalize unexpected branch: {branch}")
    if not changed_files(worktree):
        raise RuntimeError("No source changes in the worktree; PR was not created.")
    run(["git", "add", "-A"], worktree)
    run(["git", "reset", "--", ".env"], worktree, check=False)
    message = (
        f"Implement Jira proposal {args.issue_key}\n\n{args.summary}\n\n"
        "Co-Authored-By: Claude <noreply@anthropic.com>"
    )
    run(["git", "commit", "-m", message], worktree)
    run(["git", "push", "--set-upstream", "origin", branch], worktree)

    title = f"Fix {args.issue_key}: {jira_summary(root, args.issue_key)}"
    body = (
        f"## Jira\n\n{args.issue_key}\n\n## Changes\n\n{args.summary}\n\n"
        "🤖 Generated with [Claude Code](https://claude.com/claude-code)"
    )
    result = run([PYTHON, GITHUB_TOOL, "create-pr", "--head", branch, "--base", args.base,
                  "--title", title, "--body", body], root)
    match = re.search(r"URL:\s*(\S+)", result.stdout)
    if not match:
        raise RuntimeError("GitHub tool did not return a PR URL")
    pr_url = match.group(1)
    run([PYTHON, JIRA_TOOL, "link-pr", args.issue_key, pr_url,
         "--branch", branch, "--status", "Open"], root)
    run(["git", "worktree", "remove", "--force", worktree], root, check=False)
    print(f"PR created: {pr_url}")


def abort(args):
    root = repo_root()
    worktree = Path(args.worktree).resolve()
    branch = run(["git", "rev-parse", "--abbrev-ref", "HEAD"], worktree, check=False).stdout.strip()
    run(["git", "worktree", "remove", "--force", worktree], root, check=False)
    if branch.startswith("claude/"):
        run(["git", "branch", "-D", branch], root, check=False)
    print("Worktree removed; nothing was pushed.")


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    parser = argparse.ArgumentParser(description="Jira issue -> worktree -> GitHub PR")
    sub = parser.add_subparsers(dest="command", required=True)

    p = sub.add_parser("prepare", help="Read Jira, set In Progress, create a worktree")
    p.add_argument("issue_key")
    p.add_argument("--base", default=DEFAULT_BASE)
    p.add_argument("--dry-run", action="store_true")
    p.set_defaults(func=prepare)

    p = sub.add_parser("finalize", help="Commit, push, open PR, link it in Jira")
    p.add_argument("issue_key")
    p.add_argument("--worktree", required=True)
    p.add_argument("--summary", required=True, help="Short description of the change")
    p.add_argument("--base", default=DEFAULT_BASE)
    p.set_defaults(func=finalize)

    p = sub.add_parser("abort", help="Remove the worktree without pushing")
    p.add_argument("--worktree", required=True)
    p.set_defaults(func=abort)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, OSError, subprocess.CalledProcessError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        sys.exit(1)
