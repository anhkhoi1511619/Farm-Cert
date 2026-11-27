# Jira reference (project KAN)

## Instance and project

- Base URL: `https://anhkhoidev1511619.atlassian.net` (override with `JIRA_BASE_URL`)
- Project: key `KAN`, ID `10000`, name "My Software Team", type software
- Issue types: Epic, Subtask, Task, Story. **Task = issue type ID `10004`** (used by `create`)
- Priorities: Highest=1, High=2, Medium=3, Low=4, Lowest=5 (`--priority` takes the name)
- Create metadata: `summary`, `project`, `issuetype` required; reporter has a default; description, priority, assignee, due date, labels optional.
- Issue URL: `<base>/browse/KAN-123`

These values were read from the create-metadata endpoint for KAN. Re-query metadata before reusing the script on another project.

## API notes

- REST API v3, HTTP Basic auth with `email:api_token` (base64).
- Descriptions and comments use Atlassian Document Format (ADF); the script wraps plain text in a single paragraph.
- Assignee is set by `accountId` (get your own from `GET /rest/api/3/myself`), never by display name.
- Status changes: `GET /rest/api/3/issue/{key}/transitions`, then `POST` the transition ID. `status` matches the requested name against both the transition name and its destination status.
- PR links: `link-pr` creates a remote link (`relationship: implements`, application `github`) which shows in the Jira Development panel, then posts an AI-format comment. It skips the link if the URL already exists.

## Errors

- **401**: wrong email/token, revoked token, or missing env var. Check that `.env` has `JIRA_TOKEN` and `EMAIL`/`JIRA_EMAIL` (don't print the token).
- **403**: auth works but the account lacks project/issue permission.
- **400**: invalid payload or field value, or invalid transition. The script prints Jira's JSON error.
- **Status cannot be changed**: the target is not reachable from the current state; run `transitions`.

## Security

- Never hard-code a token in source code, and never commit `.env`. It is already in `.gitignore`.
- In CI (Jenkins), inject the token as a Secret Text credential.
- If a token leaks, revoke it in Atlassian and create a new one.

## Extending

Add a subcommand in `main()` following the pattern: CLI argument → validate → `request()` → print the result. Candidate additions: assign, priority, labels, due date, search (JQL), attachments.
