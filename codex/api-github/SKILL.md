---
name: github-pull-request-commit-management
description: Manage GitHub pull requests and commits with Python 3 and the GitHub REST API, including creating, reading, updating, commenting on, and merging pull requests plus inspecting commits and creating follow-up commits.
---

# GitHub Pull Request and Commit Management

## Purpose

Use `github_tool.py` to manage the current GitHub repository through the REST API without third-party Python packages.

The tool reads these environment variables:

```text
GITHUB_TOKEN
GITHUB_OWNER
GITHUB_REPO
GITHUB_BASE_URL (optional; defaults to https://api.github.com)
```

Never hard-code or print `GITHUB_TOKEN`. Keep it in `.env` or another secret store, and keep `.env` ignored by Git.

## Pull requests

List pull requests:

```powershell
python codex\github_tool.py list-prs --state open
```

Get one pull request:

```powershell
python codex\github_tool.py get-pr 12
```

The `get-pr` output includes `State`, `Merged`, and `Merged at`.

Check merge status explicitly:

```powershell
python codex\github_tool.py merge-status 12
```

Interpretation:

```text
Merged: True  -> the pull request was merged
Merged: False -> it has not been merged
Merged at: null -> no merge has occurred
```

Create a pull request:

```powershell
python codex\github_tool.py create-pr --head feature/example --base main --title "Add example" --body "Describe the change."
```

Update a pull request:

```powershell
python codex\github_tool.py update-pr 12 --title "Updated title" --body "Updated description" --state open
```

Add a comment:

```powershell
python codex\github_tool.py comment-pr 12 "Review has started."
```

Merge a pull request only after confirming the target number, branch, and merge intent:

```powershell
python codex\github_tool.py merge-pr 12 --method squash --commit-title "Merge example"
```

Supported merge methods are `merge`, `squash`, and `rebase`.

## Commits

Inspect a commit:

```powershell
python codex\github_tool.py get-commit abc1234
```

Comment on a commit:

```powershell
python codex\github_tool.py comment-commit abc1234 "Follow-up needed."
```

GitHub commits are immutable. To change committed content, create a new commit on a branch by creating or updating a repository file:

```powershell
python codex\github_tool.py commit-file docs\status.md --content "Updated status" --branch main --message "Update status"
```

When updating an existing file, the tool first retrieves the current file SHA and sends it with the update request. It does not force-push, rewrite history, or delete branches.

## Safety workflow

For destructive or externally visible operations, inspect first, confirm the exact owner/repository/number or branch, then mutate. Pull request merging is intentionally an explicit command. Existing commits should not be described as edited; use a new commit instead.
