---
name: jira-to-pr
description: Implement a Jira issue (KAN-xx) on a fresh branch in an isolated worktree, then push it, open a linked GitHub pull request and update Jira. Use when the user asks to implement a Jira ticket as a PR.
argument-hint: <ISSUE-KEY> [--base main]
disable-model-invocation: true
allowed-tools: Bash(python .claude/skills/jira-to-pr/scripts/jira_to_pr.py:*)
---

# Jira issue → pull request

Issue: `$ARGUMENTS` (ask for the key if empty).

Script (run from the repository root):

```
python .claude/skills/jira-to-pr/scripts/jira_to_pr.py <prepare|finalize|abort> ...
```

It needs `JIRA_TOKEN`, `EMAIL`/`JIRA_EMAIL`, `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO` in `.env`. It also reads optional `BASE_BRANCH` (default `main`), `GIT_COMMIT_NAME` and `GIT_COMMIT_EMAIL`. `git push` must already be authenticated.

## Steps

1. **Preview.** Run `prepare <KEY> --dry-run`. It prints the summary, description and comments without changing anything. Restate the proposal to the user in a few lines. If the ticket is not a concrete code change, or is ambiguous, stop and ask.
2. **Prepare.** Run `prepare <KEY>`. This sets Jira to 70% / In Progress, fetches `origin/<base>`, and creates branch `claude/<key>-<timestamp>` in `.worktrees/<key>-<timestamp>`. Note the `WORKTREE:` path it prints.
3. **Implement inside the worktree only.** Every read and edit goes under the `WORKTREE` path, never the main checkout. Keep the change focused on the proposal. Don't touch `.env` or secrets. Run the most relevant check there (for example `./gradlew test` or `./gradlew assembleDebug` from the worktree). Show the user the diff (`git -C <worktree> diff`) and get approval before step 4.
4. **Finalize.** Run `finalize <KEY> --worktree <path> --summary "<2-4 line description of the change>"`. It commits everything except `.env`, pushes, opens a PR against the base, links the PR in Jira's Development panel with an AI-format comment, and removes the worktree. Report the PR URL.
5. **If you abandon the work,** run `abort --worktree <path>`. It removes the worktree and local branch, and nothing is pushed. Jira stays In Progress, so tell the user.

## Guarantees

- Never reuse an existing branch. `finalize` refuses any branch that isn't `claude/...`.
- No empty PRs: `finalize` fails if the worktree has no changes, and it keeps the worktree.
- Never merge the PR here. Merging and setting Jira to 100% are separate, explicit steps (see the `github-pr` and `jira` skills).
