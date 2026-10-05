#!/usr/bin/env python3
"""GitHub REST API helper for pull requests and commits.

Environment:
  GITHUB_TOKEN  required
  GITHUB_OWNER  required
  GITHUB_REPO   required
  GITHUB_BASE_URL optional, defaults to https://api.github.com

Examples:
  python github_tool.py list-prs --state open
  python github_tool.py get-pr 12
  python github_tool.py create-pr --head feature/x --base main --title "Title"
  python github_tool.py update-pr 12 --state closed
  python github_tool.py comment-pr 12 "Comment"
  python github_tool.py merge-pr 12 --method squash
  python github_tool.py get-commit abc1234
  python github_tool.py comment-commit abc1234 "Comment"
  python github_tool.py commit-file docs/status.md --content "Updated" --branch main --message "Update status"
"""

import argparse
import base64
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request


def get_config():
    token = os.getenv("GITHUB_TOKEN")
    owner = os.getenv("GITHUB_OWNER")
    repo = os.getenv("GITHUB_REPO")
    base_url = os.getenv("GITHUB_BASE_URL", "https://api.github.com").rstrip("/")
    missing = [name for name, value in (("GITHUB_TOKEN", token), ("GITHUB_OWNER", owner), ("GITHUB_REPO", repo)) if not value]
    if missing:
        print("ERROR: missing environment variable(s): " + ", ".join(missing))
        sys.exit(1)
    return base_url, owner, repo, token


def request(method, path, data=None, query=None):
    base_url, owner, repo, token = get_config()
    path = path.format(owner=urllib.parse.quote(owner), repo=urllib.parse.quote(repo))
    url = base_url + path
    if query:
        url += "?" + urllib.parse.urlencode(query)
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token}",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "codex-github-tool",
        "Content-Type": "application/json",
    }
    body = json.dumps(data).encode("utf-8") if data is not None else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method.upper())
    try:
        with urllib.request.urlopen(req) as response:
            raw = response.read().decode("utf-8")
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as error:
        raw = error.read().decode("utf-8", errors="replace")
        try:
            print(json.dumps(json.loads(raw), indent=2, ensure_ascii=False))
        except json.JSONDecodeError:
            print(raw)
        print(f"\nHTTP {error.code}: {error.reason}")
        sys.exit(1)
    except urllib.error.URLError as error:
        print(f"Connection error: {error.reason}")
        sys.exit(1)


def repo_path(suffix):
    return "/repos/{owner}/{repo}" + suffix


def create_pr(args):
    data = {"title": args.title, "head": args.head, "base": args.base}
    if args.body is not None:
        data["body"] = args.body
    if args.draft:
        data["draft"] = True
    result = request("POST", repo_path("/pulls"), data)
    print(f"Pull request created: #{result['number']}")
    print(f"URL: {result['html_url']}")


def get_pr(args):
    result = request("GET", repo_path(f"/pulls/{args.number}"))
    print(f"Number : #{result['number']}")
    print(f"Title  : {result['title']}")
    print(f"State  : {result['state']}")
    print(f"Merged : {result.get('merged')}")
    print(f"Merged at: {result.get('merged_at')}")
    print(f"Head   : {result['head']['ref']}")
    print(f"Base   : {result['base']['ref']}")
    print(f"URL    : {result['html_url']}")


def merge_status(args):
    result = request("GET", repo_path(f"/pulls/{args.number}"))
    print(f"Pull request #{result['number']}")
    print(f"State     : {result['state']}")
    print(f"Merged    : {result.get('merged')}")
    print(f"Merged at : {result.get('merged_at')}")
    print(f"URL       : {result['html_url']}")


def list_prs(args):
    results = request("GET", repo_path("/pulls"), query={"state": args.state, "per_page": args.limit})
    if not results:
        print("No pull requests found.")
        return
    for pr in results:
        print(f"#{pr['number']} [{pr['state']}] {pr['title']} ({pr['head']['ref']} -> {pr['base']['ref']})")


def update_pr(args):
    data = {}
    for name in ("title", "body", "state", "base"):
        value = getattr(args, name)
        if value is not None:
            data[name] = value
    if not data:
        print("ERROR: provide at least one of --title, --body, --state, or --base")
        sys.exit(1)
    result = request("PATCH", repo_path(f"/pulls/{args.number}"), data)
    print(f"Pull request updated: #{result['number']}")
    print(f"State: {result['state']}")
    print(f"URL: {result['html_url']}")


def comment_pr(args):
    result = request("POST", repo_path(f"/issues/{args.number}/comments"), {"body": args.comment})
    print(f"Comment added to PR #{args.number}: {result['id']}")


def format_ai_comment(content, proposal, done, not_done, confirmation):
    return (
        "@Đây là comment tự động được tạo ra, không phải do con người viết\n\n"
        f"Nội dung: {content}\n\n"
        f"Đề xuất: {proposal}\n\n"
        f"Đã làm gì: {done}\n\n"
        f"Chưa làm gì: {not_done}\n\n"
        f"Điểm cần xác nhận: {confirmation}"
    )


def ai_comment_pr(args):
    comment_pr(argparse.Namespace(number=args.number, comment=format_ai_comment(
        args.content, args.proposal, args.done, args.not_done, args.confirmation
    )))


def merge_pr(args):
    data = {"merge_method": args.method}
    if args.commit_title:
        data["commit_title"] = args.commit_title
    if args.commit_message:
        data["commit_message"] = args.commit_message
    result = request("PUT", repo_path(f"/pulls/{args.number}/merge"), data)
    print(f"Merged: {result.get('merged')}")
    print(f"Message: {result.get('message')}")
    if result.get("sha"):
        print(f"Merge SHA: {result['sha']}")


def get_commit(args):
    result = request("GET", repo_path(f"/commits/{urllib.parse.quote(args.sha)}"))
    print(f"SHA     : {result['sha']}")
    print(f"Message : {result['commit']['message'].splitlines()[0]}")
    print(f"Author  : {result['commit']['author'].get('name')}")
    print(f"Date    : {result['commit']['author'].get('date')}")
    print(f"URL     : {result['html_url']}")


def comment_commit(args):
    result = request("POST", repo_path(f"/commits/{urllib.parse.quote(args.sha)}/comments"), {"body": args.comment})
    print(f"Comment added to commit {args.sha}: {result['id']}")


def ai_comment_commit(args):
    comment_commit(argparse.Namespace(sha=args.sha, comment=format_ai_comment(
        args.content, args.proposal, args.done, args.not_done, args.confirmation
    )))


def commit_file(args):
    path = "/contents/" + "/".join(urllib.parse.quote(part) for part in args.path.replace("\\", "/").split("/"))
    data = {"message": args.message, "content": base64.b64encode(args.content.encode("utf-8")).decode("ascii"), "branch": args.branch}
    try:
        current = request("GET", repo_path(path), query={"ref": args.branch})
        data["sha"] = current["sha"]
        action = "updated"
    except SystemExit:
        action = "created"
    result = request("PUT", repo_path(path), data)
    print(f"File {action}; new commit: {result['commit']['sha']}")
    print(f"URL: {result['commit']['html_url']}")


def main():
    parser = argparse.ArgumentParser(description="GitHub pull request and commit helper")
    sub = parser.add_subparsers(dest="command", required=True)

    p = sub.add_parser("create-pr"); p.add_argument("--head", required=True); p.add_argument("--base", required=True); p.add_argument("--title", required=True); p.add_argument("--body"); p.add_argument("--draft", action="store_true"); p.set_defaults(func=create_pr)
    p = sub.add_parser("get-pr"); p.add_argument("number", type=int); p.set_defaults(func=get_pr)
    p = sub.add_parser("merge-status", help="Check whether a pull request was merged"); p.add_argument("number", type=int); p.set_defaults(func=merge_status)
    p = sub.add_parser("list-prs"); p.add_argument("--state", choices=["open", "closed", "all"], default="open"); p.add_argument("--limit", type=int, default=30); p.set_defaults(func=list_prs)
    p = sub.add_parser("update-pr"); p.add_argument("number", type=int); p.add_argument("--title"); p.add_argument("--body"); p.add_argument("--state", choices=["open", "closed"]); p.add_argument("--base"); p.set_defaults(func=update_pr)
    p = sub.add_parser("comment-pr"); p.add_argument("number", type=int); p.add_argument("comment"); p.set_defaults(func=comment_pr)
    p = sub.add_parser("ai-comment-pr", help="Add a structured AI-authored comment to a PR"); p.add_argument("number", type=int); p.add_argument("--content", required=True); p.add_argument("--proposal", required=True); p.add_argument("--done", required=True); p.add_argument("--not-done", required=True); p.add_argument("--confirmation", required=True); p.set_defaults(func=ai_comment_pr)
    p = sub.add_parser("merge-pr"); p.add_argument("number", type=int); p.add_argument("--method", choices=["merge", "squash", "rebase"], default="merge"); p.add_argument("--commit-title"); p.add_argument("--commit-message"); p.set_defaults(func=merge_pr)
    p = sub.add_parser("get-commit"); p.add_argument("sha"); p.set_defaults(func=get_commit)
    p = sub.add_parser("comment-commit"); p.add_argument("sha"); p.add_argument("comment"); p.set_defaults(func=comment_commit)
    p = sub.add_parser("ai-comment-commit", help="Add a structured AI-authored comment to a commit"); p.add_argument("sha"); p.add_argument("--content", required=True); p.add_argument("--proposal", required=True); p.add_argument("--done", required=True); p.add_argument("--not-done", required=True); p.add_argument("--confirmation", required=True); p.set_defaults(func=ai_comment_commit)
    p = sub.add_parser("commit-file"); p.add_argument("path"); p.add_argument("--content", required=True); p.add_argument("--branch", required=True); p.add_argument("--message", required=True); p.set_defaults(func=commit_file)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
