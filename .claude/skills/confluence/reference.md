# Confluence reference

## Instance and spaces

- Base URL: `https://anhkhoidev1511619.atlassian.net/wiki` (override with `CONFLUENCE_BASE_URL`)
- Spaces (read from `GET /api/v2/spaces` on 2026-11-27):
  - `SD` — "Software Development" (onboarding/team space)
  - `~62ae977df38b4dcf73d6ae20` — "Anh Khoi" (personal space)
- Page URL: `<base>/spaces/<KEY>/pages/<id>/<title>`; the script prints it from `_links.webui`.

## API notes

- HTTP Basic auth with `email:api_token` (base64), same token as Jira.
- Pages, spaces, comments: REST API **v2** (`/wiki/api/v2/...`).
  - `GET /api/v2/spaces?keys=SD` → space ID (pages are created by `spaceId`, not key)
  - `GET /api/v2/spaces/{id}/pages`, `GET /api/v2/pages/{id}?body-format=storage`
  - `POST /api/v2/pages`, `PUT /api/v2/pages/{id}` (must send `version.number = current + 1`)
  - `GET /api/v2/pages/{id}/footer-comments`, `POST /api/v2/footer-comments`
- Search: REST API **v1** `GET /wiki/rest/api/search?cql=...` (CQL has no v2 equivalent).
  - Examples: `type=page AND space="SD" AND title ~ "release"`, `lastmodified > now("-7d")`, `label = "spec"`.
- Body format: storage (XHTML). Plain text is wrapped in `<p>`, escaped, single newlines become `<br />`.
  Useful storage snippets: `<h2>…</h2>`, `<ul><li>…</li></ul>`, `<table><tbody><tr><th>…</th></tr></tbody></table>`,
  code block `<ac:structured-macro ac:name="code"><ac:plain-text-body><![CDATA[...]]></ac:plain-text-body></ac:structured-macro>`.
- `get` renders storage to rough text (headings as `#`, list items as `-`, cells split by `|`); use `--raw` for exact markup.

## Errors

- **401**: wrong email/token, revoked token, or missing env var. Check `.env` (don't print the token).
- **403**: auth works but the account lacks permission on that space/page.
- **404**: wrong page ID, or the page is in a space you can't see.
- **409**: version conflict on `update` — someone edited the page; run `get` again and retry.
- **400**: invalid storage XHTML or payload. The script prints Confluence's JSON error.

## Security

- Never hard-code a token in source code, and never commit `.env`. It is already in `.gitignore`.
- If a token leaks, revoke it in Atlassian and create a new one.

## Extending

Add a subcommand in `main()` following the pattern: CLI argument → validate → `request()` → print the result. Candidate additions: labels, attachments, inline comments, page tree (`/api/v2/pages/{id}/children`), delete/archive.
