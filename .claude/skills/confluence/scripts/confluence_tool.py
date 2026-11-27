#!/usr/bin/env python3
"""
Confluence Cloud REST API helper.

Usage (from the repository root):
  python .claude/skills/confluence/scripts/confluence_tool.py spaces
  python .claude/skills/confluence/scripts/confluence_tool.py pages SD
  python .claude/skills/confluence/scripts/confluence_tool.py get 123456
  python .claude/skills/confluence/scripts/confluence_tool.py search "release notes" --space SD
  python .claude/skills/confluence/scripts/confluence_tool.py create SD "Title" "Body text" --parent 123456
  python .claude/skills/confluence/scripts/confluence_tool.py update 123456 --body-file notes.txt
  python .claude/skills/confluence/scripts/confluence_tool.py comment 123456 "Comment text"

Authentication is read from the environment or from the nearest .env file:
  CONFLUENCE_TOKEN / CONFLUENCE_EMAIL (fall back to JIRA_TOKEN / JIRA_EMAIL / EMAIL),
  CONFLUENCE_BASE_URL (optional, must end with /wiki)

An Atlassian API token works for both Jira and Confluence on the same site.
No third-party Python package is required.
"""

import argparse
import base64
import html
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


DEFAULT_BASE_URL = "https://anhkhoidev1511619.atlassian.net/wiki"

AI_HEADER = "@Đây là comment tự động được tạo ra, không phải do con người viết"


def load_dotenv():
    """Load KEY=VALUE pairs from the nearest .env without overriding the process environment."""
    here = Path(__file__).resolve()
    for directory in (here.parent, *here.parents):
        env_file = directory / ".env"
        if not env_file.is_file():
            continue
        for raw in env_file.read_text(encoding="utf-8").splitlines():
            line = raw.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))
        return


def get_config():
    load_dotenv()
    base_url = os.getenv("CONFLUENCE_BASE_URL", DEFAULT_BASE_URL).rstrip("/")
    email = os.getenv("CONFLUENCE_EMAIL") or os.getenv("JIRA_EMAIL") or os.getenv("EMAIL")
    token = os.getenv("CONFLUENCE_TOKEN") or os.getenv("JIRA_TOKEN")

    if not email or not token:
        print(
            "ERROR: CONFLUENCE_TOKEN (or JIRA_TOKEN) and CONFLUENCE_EMAIL "
            "(or JIRA_EMAIL / EMAIL) are required in the environment or .env."
        )
        sys.exit(1)

    return base_url, email, token


def request(method, path, data=None, query=None):
    base_url, email, token = get_config()

    url = base_url + path
    if query:
        url += "?" + urllib.parse.urlencode(query)
    auth = base64.b64encode(f"{email}:{token}".encode("utf-8")).decode("ascii")

    headers = {
        "Authorization": f"Basic {auth}",
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
    body = json.dumps(data).encode("utf-8") if data is not None else None
    req = urllib.request.Request(url=url, data=body, headers=headers, method=method.upper())

    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            raw = response.read().decode("utf-8")
            return json.loads(raw) if raw else {}

    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8", errors="replace")
        try:
            print(json.dumps(json.loads(raw), indent=2, ensure_ascii=False))
        except json.JSONDecodeError:
            print(raw)
        print(f"\nHTTP {e.code}: {e.reason}")
        sys.exit(1)

    except urllib.error.URLError as e:
        print(f"Connection error: {e.reason}")
        sys.exit(1)


# ---------- body helpers ----------

def text_to_storage(text):
    """Wrap plain text in storage-format paragraphs; blank lines split paragraphs."""
    paragraphs = re.split(r"\n\s*\n", text.strip())
    parts = []
    for para in paragraphs:
        lines = [html.escape(line) for line in para.splitlines()]
        parts.append("<p>" + "<br />".join(lines) + "</p>")
    return "".join(parts)


def storage_to_text(value):
    """Rough plain-text rendering of storage-format XHTML for reading."""
    if not value:
        return ""
    text = re.sub(r"<ac:parameter[^>]*>.*?</ac:parameter>", "", value, flags=re.S)
    text = re.sub(r"<br\s*/?>", "\n", text)
    text = re.sub(r"</(p|h[1-6]|li|tr|div|pre|blockquote)>", "\n", text)
    text = re.sub(r"<li[^>]*>", "- ", text)
    text = re.sub(r"<h([1-6])[^>]*>", lambda m: "#" * int(m.group(1)) + " ", text)
    text = re.sub(r"</t[dh]>", " | ", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def resolve_body(body, body_file, storage):
    if body_file:
        body = Path(body_file).read_text(encoding="utf-8")
    if body is None:
        return None
    return body if storage else text_to_storage(body)


def page_url(page):
    links = page.get("_links", {})
    base_url = links.get("base") or get_config()[0]
    webui = links.get("webui", "")
    return base_url + webui if webui else ""


# ---------- spaces ----------

def space_id(space_key):
    data = request("GET", "/api/v2/spaces", query={"keys": space_key})
    results = data.get("results", [])
    if not results:
        print(f"ERROR: space '{space_key}' not found or not accessible.")
        sys.exit(1)
    return results[0]["id"]


def list_spaces():
    data = request("GET", "/api/v2/spaces", query={"limit": 100})
    for space in data.get("results", []):
        print(f"{space.get('key')} | {space.get('name')} | {space.get('type')} | id={space.get('id')}")


def list_pages(space_key, limit):
    sid = space_id(space_key)
    data = request(
        "GET",
        f"/api/v2/spaces/{sid}/pages",
        query={"limit": limit, "sort": "-modified-date", "status": "current"},
    )
    for page in data.get("results", []):
        parent = page.get("parentId") or "-"
        print(f"{page.get('id')} | {page.get('title')} | parent={parent}")
    if data.get("_links", {}).get("next"):
        print("(more pages exist; raise --limit)")


# ---------- pages ----------

def fetch_page(page_id):
    return request("GET", f"/api/v2/pages/{page_id}", query={"body-format": "storage"})


def get_page(page_id, raw):
    page = fetch_page(page_id)
    value = page.get("body", {}).get("storage", {}).get("value", "")
    print(f"ID: {page.get('id')}")
    print(f"Title: {page.get('title')}")
    print(f"Space ID: {page.get('spaceId')}")
    print(f"Parent ID: {page.get('parentId') or '-'}")
    print(f"Version: {page.get('version', {}).get('number')}")
    print(f"URL: {page_url(page)}")
    print("\n--- Body ---")
    print(value if raw else storage_to_text(value))


def search(query_text, space_key, cql, limit):
    if not cql:
        escaped = query_text.replace('"', '\\"')
        cql = f'type=page AND text ~ "{escaped}"'
        if space_key:
            cql += f' AND space="{space_key}"'
    data = request("GET", "/rest/api/search", query={"cql": cql, "limit": limit})
    for item in data.get("results", []):
        content = item.get("content", {})
        space = item.get("resultGlobalContainer", {}).get("title", "")
        print(f"{content.get('id')} | {content.get('title') or item.get('title')} | {space}")
    print(f"total: {data.get('totalSize', len(data.get('results', [])))}")


def create_page(space_key, title, body, parent_id):
    payload = {
        "spaceId": space_id(space_key),
        "status": "current",
        "title": title,
        "body": {"representation": "storage", "value": body or ""},
    }
    if parent_id:
        payload["parentId"] = parent_id
    page = request("POST", "/api/v2/pages", data=payload)
    print("Page created.")
    print(f"ID: {page.get('id')}")
    print(f"URL: {page_url(page)}")


def update_page(page_id, title, body, message, append):
    if title is None and body is None:
        print("ERROR: pass --title and/or --body/--body-file.")
        sys.exit(1)
    current = fetch_page(page_id)
    old_body = current.get("body", {}).get("storage", {}).get("value", "")
    if body is None:
        new_body = old_body
    elif append:
        new_body = old_body + body
    else:
        new_body = body

    payload = {
        "id": page_id,
        "status": "current",
        "title": title or current.get("title"),
        "body": {"representation": "storage", "value": new_body},
        "version": {"number": current["version"]["number"] + 1},
    }
    if message:
        payload["version"]["message"] = message
    page = request("PUT", f"/api/v2/pages/{page_id}", data=payload)
    print(f"Page updated to version {page.get('version', {}).get('number')}.")
    print(f"URL: {page_url(page)}")


# ---------- comments ----------

def list_comments(page_id):
    data = request(
        "GET",
        f"/api/v2/pages/{page_id}/footer-comments",
        query={"body-format": "storage", "limit": 100},
    )
    results = data.get("results", [])
    if not results:
        print("No comments.")
    for comment in results:
        version = comment.get("version", {})
        author = version.get("authorId", "?")
        created = version.get("createdAt", "")
        text = storage_to_text(comment.get("body", {}).get("storage", {}).get("value", ""))
        print(f"--- {comment.get('id')} | author={author} | {created}")
        print(text)
        print()


def add_comment(page_id, text):
    payload = {
        "pageId": page_id,
        "body": {"representation": "storage", "value": text_to_storage(text)},
    }
    comment = request("POST", "/api/v2/footer-comments", data=payload)
    print(f"Comment added. ID: {comment.get('id')}")


def format_ai_comment(content, proposal, done, not_done, confirmation):
    return (
        f"{AI_HEADER}\n\n"
        f"Nội dung: {content}\n\n"
        f"Đề xuất: {proposal}\n\n"
        f"Đã làm gì: {done}\n\n"
        f"Chưa làm gì: {not_done}\n\n"
        f"Điểm cần xác nhận: {confirmation}"
    )


# ---------- CLI ----------

def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    parser = argparse.ArgumentParser(description="Confluence Cloud helper")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("spaces", help="List accessible spaces")

    p_pages = sub.add_parser("pages", help="List pages in a space (newest first)")
    p_pages.add_argument("space_key", help="Example: SD")
    p_pages.add_argument("--limit", type=int, default=50)

    p_get = sub.add_parser("get", help="Show a page as plain text")
    p_get.add_argument("page_id")
    p_get.add_argument("--raw", action="store_true", help="Print storage XHTML instead of text")

    p_search = sub.add_parser("search", help="Full-text search pages (or raw CQL)")
    p_search.add_argument("query", nargs="?", default="")
    p_search.add_argument("--space", help="Limit to a space key")
    p_search.add_argument("--cql", help="Raw CQL; overrides query/--space")
    p_search.add_argument("--limit", type=int, default=25)

    for name, help_text in (("create", "Create a page"), ("update", "Update a page")):
        p = sub.add_parser(name, help=help_text)
        if name == "create":
            p.add_argument("space_key")
            p.add_argument("title")
            p.add_argument("body", nargs="?", default=None)
            p.add_argument("--parent", help="Parent page ID")
        else:
            p.add_argument("page_id")
            p.add_argument("--title")
            p.add_argument("--body")
            p.add_argument("--message", help="Version message")
            p.add_argument("--append", action="store_true", help="Append body instead of replacing")
        p.add_argument("--body-file", help="Read body from a UTF-8 file")
        p.add_argument("--storage", action="store_true", help="Body is storage XHTML, not plain text")

    p_comments = sub.add_parser("comments", help="List footer comments on a page")
    p_comments.add_argument("page_id")

    p_comment = sub.add_parser("comment", help="Add a human comment (verbatim)")
    p_comment.add_argument("page_id")
    p_comment.add_argument("text")

    p_ai = sub.add_parser("ai-comment", help="Add an AI-format comment")
    p_ai.add_argument("page_id")
    p_ai.add_argument("--content", required=True)
    p_ai.add_argument("--proposal", default="Không có")
    p_ai.add_argument("--done", default="Không có")
    p_ai.add_argument("--not-done", default="Không có")
    p_ai.add_argument("--confirm", default="Không có")

    args = parser.parse_args()

    if args.command == "spaces":
        list_spaces()
    elif args.command == "pages":
        list_pages(args.space_key, args.limit)
    elif args.command == "get":
        get_page(args.page_id, args.raw)
    elif args.command == "search":
        if not args.query and not args.cql:
            parser.error("search needs a query or --cql")
        search(args.query, args.space, args.cql, args.limit)
    elif args.command == "create":
        body = resolve_body(args.body, args.body_file, args.storage)
        create_page(args.space_key, args.title, body, args.parent)
    elif args.command == "update":
        body = resolve_body(args.body, args.body_file, args.storage)
        update_page(args.page_id, args.title, body, args.message, args.append)
    elif args.command == "comments":
        list_comments(args.page_id)
    elif args.command == "comment":
        add_comment(args.page_id, args.text)
    elif args.command == "ai-comment":
        add_comment(
            args.page_id,
            format_ai_comment(args.content, args.proposal, args.done, args.not_done, args.confirm),
        )


if __name__ == "__main__":
    main()
