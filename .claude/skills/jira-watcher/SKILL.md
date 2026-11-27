---
name: jira-watcher
description: Start, dry-run or explain the unattended Jira comment watcher, which polls project KAN and turns actionable comments into PRs by running Claude Code headless in an isolated worktree. Use only when the user asks to run or configure the watcher.
argument-hint: [--dry-run] [--once] [--interval 30]
disable-model-invocation: true
---

# Jira comment watcher (unattended)

Two scripts in `.claude/skills/jira-watcher/scripts/`:

- `jira_comment_watcher.py` prints new comments only (read-only): `python .claude/skills/jira-watcher/scripts/jira_comment_watcher.py [--interval 5] [--include-existing] [--once]`
- `jira_comment_to_pr.py` is the auto-PR watcher. For each new **actionable** comment on an open KAN issue it:
  1. sets the issue to 70% / In Progress,
  2. creates `claude/<key>-comment-<ts>` in `.worktrees/`,
  3. runs `claude -p --permission-mode acceptEdits --allowedTools ...` there, with the issue context and the comment as the prompt,
  4. commits (never `.env`), pushes, opens a PR and links it in Jira with an AI-format comment,
  5. removes the worktree.

A comment is actionable when it contains a request keyword (fix, implement, sửa, thêm, tạo pr, …) and is not a bare acknowledgement. Comments that start with the AI disclaimer (`@Đây là comment tự động…`) are always ignored, so the watcher does not react to its own Jira updates.

## Running

Always dry-run first. That classifies comments without touching Jira or GitHub:

```
python .claude/skills/jira-watcher/scripts/jira_comment_to_pr.py --dry-run --once --include-existing
```

Then the real loop. It is long-running, so start it in the background (or in a terminal the user owns) and tell the user how to stop it (Ctrl+C or stop the background task):

```
python .claude/skills/jira-watcher/scripts/jira_comment_to_pr.py --interval 30
```

## Configuration (env or `.env`)

| Variable | Default | Purpose |
|---|---|---|
| `CLAUDE_EXE` | `claude` on PATH | Claude Code CLI. Install with `npm install -g @anthropic-ai/claude-code` and log in once |
| `CLAUDE_WATCHER_ALLOWED_TOOLS` | `Bash(./gradlew:*),Bash(gradlew.bat:*),Bash(git status:*),Bash(git diff:*)` | Extra tools the headless run may use without asking (comma-separated) |
| `JIRA_WATCH_JQL` | `project = KAN AND statusCategory != Done ORDER BY updated DESC` | Issues to watch |
| `BASE_BRANCH` | `main` | PR base |
| `GIT_COMMIT_NAME` / `GIT_COMMIT_EMAIL` | repo automation identity | Commit author |

Plus the Jira and GitHub credentials used by the `jira` and `github-pr` skills.

## Cautions to tell the user

- Anyone who can comment on KAN can make this push branches and open PRs. Run it only while someone reviews the PRs.
- The headless run edits files without prompting (only inside the worktree), and can run only the allowed tools listed above.
- It never merges.
