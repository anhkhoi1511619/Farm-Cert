---
name: jira-backed-github-pull-request
description: Read a Jira proposal, implement the requested source change in an isolated branch, and create a linked GitHub pull request.
---

# Jira-backed GitHub Pull Request

This skill connects Jira requirements to a code-changing GitHub pull request.
It reads the Jira issue description and comments, changes the issue to `In
Progress`, asks Codex to implement the proposal, commits the resulting source
changes on a new branch, pushes the branch, creates a PR against `main`, and
comments a formatted PR URL, branch, and status back on Jira using the Jira
`link-pr` command. That command also creates the Jira Development remote link
used by Jira's Development panel.

The implementation must be based on the Jira proposal, must not modify `.env`,
and must not reuse an existing branch.

## Environment

The project `.env` must contain:

```text
JIRA_TOKEN=...
EMAIL=...
GITHUB_TOKEN=...
GITHUB_OWNER=anhkhoi1511619
GITHUB_REPO=Farm-Cert
```

Optional values:

```text
JIRA_BASE_URL=https://anhkhoidev1511619.atlassian.net
CODEX_BASE_BRANCH=main
CODEX_EXE=codex
```

Commits created by this workflow use:

```text
Name: Info: Zz1511619zZ
Email: Zz1511619zZ@gmail.com
```

Do not print or commit any token.

## KAN-7 command

Preview the Jira proposal without changing Jira, GitHub, or source code:

```powershell
& "C:\Users\KhoiNTA2\AppData\Local\Programs\Python\Python314\python.exe" `
  .\codex\api-create-pull-request\create_pull_request.py KAN-7 --dry-run
```

Create the real implementation branch and pull request:

```powershell
& "C:\Users\KhoiNTA2\AppData\Local\Programs\Python\Python314\python.exe" `
  .\codex\api-create-pull-request\create_pull_request.py KAN-7
```

The command prints every shell command it runs. Git must be authenticated for
`git push`; the GitHub API token is used by the existing GitHub helper when it
creates the pull request.

## Expected result

The PR should contain only the source changes produced from the Jira proposal.
The final Jira comment contains the PR URL. If Codex produces no source change,
the command stops and does not create an empty PR.
