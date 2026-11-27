---
name: confluence
description: Read, search, create and update Confluence Cloud pages and comments (spaces SD and the personal space) via the Confluence REST API. Use when the user mentions Confluence, a wiki page, a page ID or an atlassian.net/wiki link, or asks to document something in Confluence or read requirements from it.
allowed-tools: Bash(python .claude/skills/confluence/scripts/confluence_tool.py:*)
---

# Confluence

All commands run from the repository root with the standard-library-only script:

```
python .claude/skills/confluence/scripts/confluence_tool.py <command> ...
```

Credentials come from the environment or the repo `.env`: `CONFLUENCE_TOKEN` / `CONFLUENCE_EMAIL`, falling back to the Jira ones (`JIRA_TOKEN`, `JIRA_EMAIL` or `EMAIL`) because one Atlassian API token covers both products. Optional `CONFLUENCE_BASE_URL` (ends with `/wiki`). Never print, echo or commit the token.

## Commands

| Goal | Command |
|---|---|
| List spaces | `spaces` |
| List pages in a space (newest first) | `pages SD [--limit 50]` |
| Read a page as plain text | `get <page_id> [--raw]` |
| Full-text search | `search "keyword" [--space SD]` or `search --cql 'title ~ "x"'` |
| Create a page | `create SD "Title" "Body" [--parent <page_id>]` or `--body-file f.txt` |
| Edit a page | `update <page_id> [--title "..."] [--body "..." \| --body-file f] [--append] [--message "..."]` |
| List comments | `comments <page_id>` |
| Human comment (verbatim) | `comment <page_id> "text"` |
| AI-format comment | `ai-comment <page_id> --content "..." --proposal "..." --done "..." --not-done "..." --confirm "..."` |

Page ID is the number in the URL: `.../wiki/spaces/SD/pages/123456/Title` → `123456`.

Bodies are plain text by default (blank line = new paragraph). Pass `--storage` to send Confluence storage XHTML (headings, tables, macros). For anything long, write it to a scratch file and use `--body-file`.

## Rules

- Read the page (`get`) and its `comments` before editing, so you change the current version and know what was asked.
- `update` without `--append` **replaces the whole body**. Prefer `--append` for adding a section; when replacing, start from `get --raw` and edit that.
- **AI vs human comments:** anything you write on your own initiative uses `ai-comment` (header `@Đây là comment tự động được tạo ra, không phải do con người viết`, then `Nội dung`, `Đề xuất`, `Đã làm gì`, `Chưa làm gì`, `Điểm cần xác nhận`). Use plain `comment` only for text the user dictated, and never rewrite human comments.
- Creating or editing pages and commenting are visible to the team: confirm the space/page and the text with the user unless they already gave them.

Spaces, API endpoints, storage format and error troubleshooting: see [reference.md](reference.md).
