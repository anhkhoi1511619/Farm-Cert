#!/usr/bin/env python3
"""
Jira Cloud REST API helper for project KAN.

Usage:
  python3 jira_tool.py create "Task summary" "Task description" --priority High
  python3 jira_tool.py status KAN-1 "In Progress"
  python3 jira_tool.py comment KAN-1 "This is a comment"
  python3 jira_tool.py get KAN-1
  python3 jira_tool.py transitions KAN-1

Authentication:
  export JIRA_BASE_URL="https://anhkhoidev1511619.atlassian.net"
  export JIRA_EMAIL="your-jira-email@example.com"
  export JIRA_TOKEN="your-api-token"

No third-party Python package is required.
"""

import argparse
import base64
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request


DEFAULT_BASE_URL = "https://anhkhoidev1511619.atlassian.net"
DEFAULT_PROJECT_KEY = "KAN"


def get_config():
    base_url = os.getenv("JIRA_BASE_URL", DEFAULT_BASE_URL).rstrip("/")
    email = os.getenv("JIRA_EMAIL")
    token = os.getenv("JIRA_TOKEN")

    if not email or not token:
        print("ERROR: JIRA_EMAIL and JIRA_TOKEN are required.")
        print("")
        print("Set them first:")
        print('  export JIRA_EMAIL="your-email@example.com"')
        print('  export JIRA_TOKEN="your-api-token"')
        sys.exit(1)

    return base_url, email, token


def request(method, path, data=None):
    base_url, email, token = get_config()

    url = base_url + path
    credentials = f"{email}:{token}".encode("utf-8")
    auth = base64.b64encode(credentials).decode("ascii")

    headers = {
        "Authorization": f"Basic {auth}",
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    body = None
    if data is not None:
        body = json.dumps(data).encode("utf-8")

    req = urllib.request.Request(
        url=url,
        data=body,
        headers=headers,
        method=method.upper(),
    )

    try:
        with urllib.request.urlopen(req) as response:
            raw = response.read().decode("utf-8")
            if not raw:
                return {}
            return json.loads(raw)

    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8", errors="replace")
        try:
            error = json.loads(raw)
            print(json.dumps(error, indent=2, ensure_ascii=False))
        except json.JSONDecodeError:
            print(raw)
        print(f"\nHTTP {e.code}: {e.reason}")
        sys.exit(1)

    except urllib.error.URLError as e:
        print(f"Connection error: {e.reason}")
        sys.exit(1)


def print_json(data):
    print(json.dumps(data, indent=2, ensure_ascii=False))


def create_issue(summary, description="", priority=None, assignee=None):
    fields = {
        "project": {"key": DEFAULT_PROJECT_KEY},
        "summary": summary,
        "issuetype": {"id": "10004"},  # Task in project KAN
    }

    if description:
        fields["description"] = {
            "type": "doc",
            "version": 1,
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {"type": "text", "text": description}
                    ],
                }
            ],
        }

    if priority:
        fields["priority"] = {"name": priority}

    if assignee:
        fields["assignee"] = {"accountId": assignee}

    result = request("POST", "/rest/api/3/issue", {"fields": fields})

    print("Task created successfully.")
    print(f"Key: {result.get('key')}")
    print(f"ID : {result.get('id')}")
    print(f"URL: {get_config()[0]}/browse/{result.get('key')}")


def get_issue(issue_key):
    result = request("GET", f"/rest/api/3/issue/{urllib.parse.quote(issue_key)}")
    fields = result.get("fields", {})

    print(f"Key      : {result.get('key')}")
    print(f"Summary  : {fields.get('summary')}")
    print(f"Status   : {fields.get('status', {}).get('name')}")
    print(f"Priority : {fields.get('priority', {}).get('name')}")
    print(f"Assignee : {(fields.get('assignee') or {}).get('displayName')}")
    print(f"Reporter : {(fields.get('reporter') or {}).get('displayName')}")
    print(f"URL      : {get_config()[0]}/browse/{result.get('key')}")


def get_transitions(issue_key):
    result = request(
        "GET",
        f"/rest/api/3/issue/{urllib.parse.quote(issue_key)}/transitions",
    )

    transitions = result.get("transitions", [])

    if not transitions:
        print("No available transitions.")
        return

    print(f"Available transitions for {issue_key}:")
    for t in transitions:
        print(f"  ID={t['id']:<5}  {t['name']}  (to: {t.get('to', {}).get('name', '')})")


def change_status(issue_key, target_status):
    # Jira status changes are performed through workflow transitions.
    result = request(
        "GET",
        f"/rest/api/3/issue/{urllib.parse.quote(issue_key)}/transitions",
    )

    transitions = result.get("transitions", [])

    matched = None
    target_lower = target_status.strip().lower()

    for transition in transitions:
        transition_name = transition.get("name", "")
        destination_name = transition.get("to", {}).get("name", "")

        if (
            transition_name.lower() == target_lower
            or destination_name.lower() == target_lower
        ):
            matched = transition
            break

    if not matched:
        print(f"Cannot find a transition to status: {target_status}")
        print("")
        print("Available transitions:")
        for t in transitions:
            print(
                f"  ID={t['id']}  {t['name']} "
                f"(to: {t.get('to', {}).get('name', '')})"
            )
        sys.exit(1)

    request(
        "POST",
        f"/rest/api/3/issue/{urllib.parse.quote(issue_key)}/transitions",
        {"transition": {"id": matched["id"]}},
    )

    print(f"Status changed successfully: {issue_key}")
    print(f"Transition: {matched['name']}")
    print(f"New status: {matched.get('to', {}).get('name', target_status)}")


def add_comment(issue_key, comment):
    # Jira Cloud REST API v3 uses Atlassian Document Format (ADF).
    data = {
        "body": {
            "type": "doc",
            "version": 1,
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {"type": "text", "text": comment}
                    ],
                }
            ],
        }
    }

    result = request(
        "POST",
        f"/rest/api/3/issue/{urllib.parse.quote(issue_key)}/comment",
        data,
    )

    print(f"Comment added successfully to {issue_key}.")
    if result.get("id"):
        print(f"Comment ID: {result['id']}")


def main():
    parser = argparse.ArgumentParser(
        description="Jira Cloud API helper for project KAN"
    )
    sub = parser.add_subparsers(dest="command", required=True)

    p_create = sub.add_parser("create", help="Create a Task")
    p_create.add_argument("summary", help="Task summary")
    p_create.add_argument("description", nargs="?", default="", help="Task description")
    p_create.add_argument(
        "--priority",
        choices=["Highest", "High", "Medium", "Low", "Lowest"],
        help="Priority",
    )
    p_create.add_argument(
        "--assignee",
        help="Assignee accountId",
    )

    p_status = sub.add_parser("status", help="Change issue status")
    p_status.add_argument("issue_key", help="Example: KAN-1")
    p_status.add_argument("target_status", help='Example: "In Progress"')

    p_comment = sub.add_parser("comment", help="Add a comment")
    p_comment.add_argument("issue_key", help="Example: KAN-1")
    p_comment.add_argument("comment", help="Comment text")

    p_get = sub.add_parser("get", help="Get issue information")
    p_get.add_argument("issue_key", help="Example: KAN-1")

    p_transitions = sub.add_parser(
        "transitions",
        help="List available status transitions",
    )
    p_transitions.add_argument("issue_key", help="Example: KAN-1")

    args = parser.parse_args()

    if args.command == "create":
        create_issue(
            args.summary,
            args.description,
            args.priority,
            args.assignee,
        )
    elif args.command == "status":
        change_status(args.issue_key, args.target_status)
    elif args.command == "comment":
        add_comment(args.issue_key, args.comment)
    elif args.command == "get":
        get_issue(args.issue_key)
    elif args.command == "transitions":
        get_transitions(args.issue_key)


if __name__ == "__main__":
    main()
