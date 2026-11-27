---
name: jira
description: Manage Jira Cloud issues in project KAN (create, read, update, transition status, comment, track PR progress, link PRs) via the Jira REST API. Use when the user mentions a Jira issue key like KAN-12, asks to create/update/move/comment on a Jira task, or asks to sync Jira with a GitHub pull request.
allowed-tools: Bash(python .claude/skills/jira/scripts/jira_tool.py:*)
---

# Jira (project KAN)

All commands run from the repository root with the standard-library-only script:

```
python .claude/skills/jira/scripts/jira_tool.py <command> ...
```

Credentials come from the environment or the repo `.env` (`JIRA_TOKEN`, `JIRA_EMAIL` or `EMAIL`, optional `JIRA_BASE_URL`). Never print, echo or commit the token.

## Commands

| Goal | Command |
|---|---|
| Issue overview | `get KAN-7` |
| Description + all comments (plain text) | `context KAN-7` |
| Create a Task | `create "Summary" "Description" [--priority High] [--assignee ACCOUNT_ID]` |
| Edit summary/description | `update KAN-7 [--summary "..."] [--description "..."]` |
| List workflow transitions | `transitions KAN-7` |
| Change status | `status KAN-7 "In Progress"` |
| Human comment (verbatim) | `comment KAN-7 "text"` |
| Progress + matching status (AI comment) | `progress KAN-7 70 --note "..."` |
| Link a GitHub PR in Jira Development (AI comment) | `link-pr KAN-7 <pr-url> --branch <branch> --status Open` |
| List Development links | `links KAN-7` |

Read `context` before acting on an issue so you know what the reporter and commenters actually asked for.

## Rules

- **Status changes go through transitions.** If `status` fails, run `transitions` and pick a reachable status; don't guess transition IDs.
- **PR progress mapping:** PR being created or open → `progress <key> 70` (In Progress). PR confirmed merged → `progress <key> 100` (Done). Check merge first with `python .claude/skills/github-pr/scripts/github_tool.py merge-status <n>`; a closed PR is not a merged PR.
- **AI vs human comments:** anything you write on your own initiative must use the AI format (`progress`, `link-pr` already do). The format starts with `@Đây là comment tự động được tạo ra, không phải do con người viết` followed by `Nội dung`, `Đề xuất`, `Đã làm gì`, `Chưa làm gì`, `Điểm cần xác nhận`. Use plain `comment` only for text the user dictated, and never rewrite human comments.
- Creating issues, changing status and commenting are visible to the team: confirm the issue key and the text with the user unless they already gave them.

Project IDs, field metadata, ADF format and error troubleshooting: see [reference.md](reference.md).
