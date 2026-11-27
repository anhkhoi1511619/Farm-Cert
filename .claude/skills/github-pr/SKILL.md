---
name: github-pr
description: Manage GitHub pull requests and commits for this repository through the GitHub REST API (list, inspect, create, update, comment with the AI-authored format, check merge status, merge and delete the merged branch, comment on commits, commit a single file). Use when the user asks about PRs or commits on GitHub, wants an AI-authored PR comment, or needs to verify whether a PR was merged.
allowed-tools: Bash(python .claude/skills/github-pr/scripts/github_tool.py list-prs:*) Bash(python .claude/skills/github-pr/scripts/github_tool.py get-pr:*) Bash(python .claude/skills/github-pr/scripts/github_tool.py merge-status:*) Bash(python .claude/skills/github-pr/scripts/github_tool.py get-commit:*)
---

# GitHub PRs and commits

Run from the repository root:

```
python .claude/skills/github-pr/scripts/github_tool.py <command> ...
```

The script reads `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO` and an optional `GITHUB_BASE_URL` from the environment or the repo `.env`. Never print or commit the token.

## Read-only

| Goal | Command |
|---|---|
| List PRs | `list-prs [--state open\|closed\|all] [--limit 30]` |
| PR details | `get-pr 12` |
| Was it merged? | `merge-status 12` |
| Commit details | `get-commit abc1234` |

## Mutating (externally visible)

| Goal | Command |
|---|---|
| Create PR | `create-pr --head <branch> --base main --title "..." [--body "..."] [--draft]` |
| Update PR | `update-pr 12 [--title] [--body] [--state open\|closed] [--base]` |
| Human comment (verbatim) | `comment-pr 12 "text"` |
| AI comment | `ai-comment-pr 12 --content "..." --proposal "..." --done "..." --not-done "..." --confirmation "..."` |
| Comment on commit | `comment-commit <sha> "text"` / `ai-comment-commit <sha> --content ... (same fields)` |
| Commit one file via API | `commit-file <path> --content "..." --branch <branch> --message "..."` |
| Merge (then deletes the head branch) | `merge-pr 12 --method merge\|squash\|rebase [--commit-title] [--commit-message] [--keep-branch]` |
| Delete branch of a PR merged elsewhere (web UI, other tool) | `delete-merged-branch 12` |
| GitHub "Automatically delete head branches" setting | `auto-delete-branches [--enable\|--disable]` (no flag = show) |

## Branch clean-up after merge

When a merge succeeds, `merge-pr` immediately deletes the PR's head branch on GitHub and the local branch of the same name, and prunes `origin/*`. Pass `--keep-branch` to opt out. `delete-merged-branch <n>` runs the same clean-up for a PR that was merged somewhere else, for example after `merge-status` shows it was merged on the web.

The clean-up deletes nothing unless GitHub reports the PR as **merged**. It also skips `main`/`master`/`develop`/the default branch, fork branches, branches still used by another open PR (as head or base), and a local branch that is currently checked out (it prints the command to run instead). A remote branch that is already gone is reported, not treated as an error.

For merges made in the GitHub web UI, the repository setting `auto-delete-branches --enable` makes GitHub delete the remote branch itself. The local branch still needs `delete-merged-branch` or `git fetch --prune` plus `git branch -D`.

## Rules

- **Inspect first, then mutate.** Before `update-pr`, `merge-pr` or `commit-file`, show the target (owner/repo, PR number or branch) and get the user's explicit confirmation. **Never merge without the user saying so for that specific PR.**
- Comments you write on your own initiative use `ai-comment-*`, which prefixes `@Đây là comment tự động được tạo ra, không phải do con người viết` and the fields `Nội dung / Đề xuất / Đã làm gì / Chưa làm gì / Điểm cần xác nhận`. Use `comment-pr` only for text the user dictated.
- Commits are immutable. To change content, make a new commit (`commit-file` or a normal git commit). The tool never force-pushes or rewrites history. It deletes branches only through the merged-PR clean-up above.
- After a merge, update the linked Jira issue to 100% with the `jira` skill, then report which branches were deleted.
