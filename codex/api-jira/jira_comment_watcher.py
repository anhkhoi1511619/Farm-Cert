#!/usr/bin/env python3
"""Poll Jira for new comments on current project issues."""

import argparse
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path


DEFAULT_JQL = "project = KAN AND statusCategory != Done ORDER BY updated DESC"


def load_dotenv():
    """Load simple KEY=VALUE pairs without overriding process variables."""
    here = Path(__file__).resolve()
    for directory in (here.parent, *here.parents):
        env_file = directory / ".env"
        if not env_file.is_file():
            continue
        for raw_line in env_file.read_text(encoding="utf-8").splitlines():
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))
        return


def get_config():
    load_dotenv()
    base_url = os.getenv("JIRA_BASE_URL", "https://anhkhoidev1511619.atlassian.net").rstrip("/")
    email = os.getenv("JIRA_EMAIL") or os.getenv("EMAIL")
    token = os.getenv("JIRA_TOKEN")
    if not email or not token:
        print("ERROR: JIRA_EMAIL or EMAIL and JIRA_TOKEN are required.", file=sys.stderr)
        sys.exit(1)
    credentials = base64.b64encode(f"{email}:{token}".encode("utf-8")).decode("ascii")
    return base_url, {"Authorization": f"Basic {credentials}", "Accept": "application/json", "User-Agent": "codex-jira-comment-watcher"}


def request(method, path, query=None):
    base_url, headers = get_config()
    url = base_url + path
    if query:
        url += "?" + urllib.parse.urlencode(query)
    request_object = urllib.request.Request(url=url, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request_object, timeout=15) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Jira HTTP {error.code}: {body}") from error
    except urllib.error.URLError as error:
        raise RuntimeError(f"Jira connection error: {error.reason}") from error


def current_issues(jql):
    result = request("GET", "/rest/api/3/search/jql", {"jql": jql, "maxResults": 100, "fields": "summary"})
    return result.get("issues", [])


def flatten_adf(value):
    if isinstance(value, dict):
        text = value.get("text", "")
        children = "".join(flatten_adf(child) for child in value.get("content", []))
        return f"{text}{children}"
    if isinstance(value, list):
        return "".join(flatten_adf(child) for child in value)
    return value if isinstance(value, str) else ""


def issue_comments(issue_key):
    result = request("GET", f"/rest/api/3/issue/{urllib.parse.quote(issue_key)}/comment", {"orderBy": "-created", "maxResults": 100})
    return result.get("comments", [])


def comment_line(issue, comment):
    author = (comment.get("author") or {}).get("displayName", "Unknown author")
    created = comment.get("created", "")
    text = flatten_adf(comment.get("body", {})).strip() or "(empty comment)"
    return f"[{created}] {issue['key']} | {author}: {text}"


def timestamp():
    return datetime.now().astimezone().strftime("%Y-%m-%d %H:%M:%S%z")


def poll(jql, seen, print_existing):
    issues = current_issues(jql)
    discovered = 0
    for issue in issues:
        for comment in issue_comments(issue["key"]):
            comment_id = str(comment.get("id"))
            if comment_id in seen:
                continue
            seen.add(comment_id)
            discovered += 1
            if print_existing:
                print(comment_line(issue, comment), flush=True)
    return issues, discovered


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    parser = argparse.ArgumentParser(description="Watch Jira for new comments on current issues")
    parser.add_argument("--interval", type=float, default=5.0, help="Polling interval in seconds (default: 5)")
    parser.add_argument("--jql", default=os.getenv("JIRA_WATCH_JQL", DEFAULT_JQL), help="JQL used to select issues")
    parser.add_argument("--include-existing", action="store_true", help="Print comments already present at startup")
    parser.add_argument("--once", action="store_true", help="Poll once and exit")
    args = parser.parse_args()
    if args.interval <= 0:
        parser.error("--interval must be greater than zero")

    seen = set()
    try:
        issues, count = poll(args.jql, seen, args.include_existing)
        print(f"[{timestamp()}] Watching {len(issues)} Jira issue(s) every {args.interval:g}s.", flush=True)
        if not args.include_existing:
            print(f"[{timestamp()}] Baseline captured: {count} existing comment(s) suppressed.", flush=True)
        if args.once:
            return
        while True:
            time.sleep(args.interval)
            try:
                issues, _ = poll(args.jql, seen, True)
                print(f"[{timestamp()}] Checked {len(issues)} issue(s).", flush=True)
            except RuntimeError as error:
                print(f"[{timestamp()}] ERROR: {error}", file=sys.stderr, flush=True)
    except KeyboardInterrupt:
        print("\nWatcher stopped.", flush=True)
    except RuntimeError as error:
        print(f"ERROR: {error}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
