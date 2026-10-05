---
name: jira-cloud-task-management
description: Manage Jira Cloud issues in project KAN using Python 3 and the Jira REST API, including creating Tasks, reading issues, listing workflow transitions, changing status, and adding comments. Authentication uses Jira email + API token via environment variables.
---

# Jira Cloud Task Management Skill

## 1. Purpose

This skill provides a reusable workflow for operating Jira Cloud from a Mac terminal with:

- Python 3
- Jira Cloud REST API v3
- Jira API token
- No third-party Python packages required

Target Jira instance:

```text
https://anhkhoidev1511619.atlassian.net
```

Target project:

```text
Project Key: KAN
Project Name: My Software Team
Project Type: software
```

The Jira project was verified through the Jira REST API.

## 2. Security

Never hard-code the Jira API token into Python source code.

Use environment variables:

```bash
export JIRA_BASE_URL="https://anhkhoidev1511619.atlassian.net"
export JIRA_EMAIL="your-jira-email@example.com"
export JIRA_TOKEN="YOUR_API_TOKEN"
```

Do not commit `.env`, shell history containing tokens, or files containing API tokens to Git.

If an API token is accidentally exposed, revoke it in Atlassian and create a new one.

## 3. Authentication

Jira Cloud API authentication is performed using HTTP Basic Authentication:

```text
email:api_token
```

The Python script converts these credentials to Base64 and sends:

```http
Authorization: Basic <base64(email:api_token)>
```

A simple authentication test:

```bash
python3 jira_tool.py get KAN-1
```

or directly test the current account using curl:

```bash
curl \
  --user "$JIRA_EMAIL:$JIRA_TOKEN" \
  --header "Accept: application/json" \
  "$JIRA_BASE_URL/rest/api/3/myself"
```

A successful `/myself` response confirms that the credentials can authenticate to Jira.

## 4. Jira Project Information

Project:

```text
KAN
```

Project ID:

```text
10000
```

Project name:

```text
My Software Team
```

The project supports these issue types:

```text
Epic
Subtask
Task
Story
```

The Task issue type was verified as:

```text
Task
Issue Type ID: 10004
```

For this project, use:

```json
"issuetype": {
  "id": "10004"
}
```

when creating a Task.

## 5. Creating a Task

The minimum fields required for a Task are:

```text
project
summary
issuetype
```

Example API payload:

```json
{
  "fields": {
    "project": {
      "key": "KAN"
    },
    "summary": "Test create task via Jira API",
    "issuetype": {
      "id": "10004"
    }
  }
}
```

Using `jira_tool.py`:

```bash
python3 jira_tool.py create \
  "Implement retry mechanism" \
  "Implement retry mechanism for reader communication."
```

With priority:

```bash
python3 jira_tool.py create \
  "Implement retry mechanism" \
  "Implement retry mechanism for reader communication." \
  --priority High
```

Supported priority names:

```text
Highest
High
Medium
Low
Lowest
```

The project API confirmed:

```text
Highest = ID 1
High    = ID 2
Medium  = ID 3
Low     = ID 4
Lowest  = ID 5
```

## 6. Assignee

Jira Cloud uses `accountId` for assigning an issue.

Example:

```json
"assignee": {
  "accountId": "ACCOUNT_ID"
}
```

The account ID should be obtained from Jira rather than guessed.

The verified Jira account used during setup had an account ID available from `/rest/api/3/myself`.

The script supports:

```bash
python3 jira_tool.py create \
  "Implement retry mechanism" \
  "Implement retry mechanism." \
  --priority High \
  --assignee "ACCOUNT_ID"
```

## 7. Description Format

Jira Cloud REST API v3 uses Atlassian Document Format (ADF) for descriptions.

Example:

```json
"description": {
  "type": "doc",
  "version": 1,
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Task description."
        }
      ]
    }
  ]
}
```

The Python script automatically builds this ADF structure from the description argument.

## 8. Getting an Issue

Use:

```bash
python3 jira_tool.py get KAN-123
```

The script displays:

```text
Key
Summary
Status
Priority
Assignee
Reporter
URL
```

The Jira issue URL is:

```text
https://anhkhoidev1511619.atlassian.net/browse/KAN-123
```

Replace `KAN-123` with the actual issue key.

## 9. Jira Status Changes

Jira status changes are performed through workflow transitions.

Do not assume that a status name itself can be sent directly to the API.

First retrieve the available transitions:

```bash
python3 jira_tool.py transitions KAN-123
```

The script calls:

```http
GET /rest/api/3/issue/{issueKey}/transitions
```

Example output:

```text
Available transitions for KAN-123:
  ID=11  To Do       (to: To Do)
  ID=21  Start       (to: In Progress)
  ID=31  Done        (to: Done)
```

Then change the status:

```bash
python3 jira_tool.py status KAN-123 "In Progress"
```

The script:

1. Retrieves available transitions.
2. Finds a transition whose name or destination status matches the requested status.
3. Sends the corresponding transition ID to Jira.
4. Reports the new status.

This avoids hard-coding transition IDs because workflow configuration can differ between Jira projects.

## 10. Adding Comments

Add a comment:

```bash
python3 jira_tool.py comment KAN-123 \
  "Investigation has started."
```

The script calls:

```http
POST /rest/api/3/issue/{issueKey}/comment
```

Jira Cloud REST API v3 also uses ADF for the comment body.

The script automatically creates the required ADF structure.

Example comment:

```bash
python3 jira_tool.py comment KAN-123 \
  "I have confirmed the retry count with the implementer."
```

## 11. Available Commands

### Create

```bash
python3 jira_tool.py create "Summary"
```

Create with description:

```bash
python3 jira_tool.py create \
  "Summary" \
  "Description"
```

Create with priority:

```bash
python3 jira_tool.py create \
  "Summary" \
  "Description" \
  --priority High
```

Create with assignee:

```bash
python3 jira_tool.py create \
  "Summary" \
  "Description" \
  --priority High \
  --assignee "ACCOUNT_ID"
```

### Get

```bash
python3 jira_tool.py get KAN-123
```

### Update content

Update the summary:

```bash
python3 jira_tool.py update KAN-123 \
  --summary "Updated task title"
```

Update the description:

```bash
python3 jira_tool.py update KAN-123 \
  --description "Updated task description."
```

Update both fields:

```bash
python3 jira_tool.py update KAN-123 \
  --summary "Updated task title" \
  --description "Updated task description."
```

The command uses `PUT /rest/api/3/issue/{issueKey}`. The description is converted to Atlassian Document Format automatically.

### List transitions

```bash
python3 jira_tool.py transitions KAN-123
```

### Change status

```bash
python3 jira_tool.py status KAN-123 "In Progress"
```

### Add comment

```bash
python3 jira_tool.py comment KAN-123 "Comment text"
```

## 12. Recommended Daily Workflow

Typical workflow:

```text
Create Task
    ↓
Get Task
    ↓
Update content when needed
    ↓
List available transitions
    ↓
Change to In Progress
    ↓
Add comments while working
    ↓
Change to Done
```

Example:

```bash
python3 jira_tool.py create \
  "Fix reader communication timeout" \
  "Investigate socket timeout and thread accumulation." \
  --priority High
```

Assume Jira returns:

```text
KAN-123
```

Then:

```bash
python3 jira_tool.py status KAN-123 "In Progress"
```

Add a progress comment:

```bash
python3 jira_tool.py comment KAN-123 \
  "Investigation has started."
```

After completion:

```bash
python3 jira_tool.py comment KAN-123 \
  "Fix has been implemented and verified."
```

Then:

```bash
python3 jira_tool.py status KAN-123 "Done"
```

## 13. Python Script Architecture

The recommended script is:

```text
jira_tool.py
```

It contains:

```text
get_config()
    ↓
request()
    ↓
Jira REST API
```

Command handlers:

```text
create_issue()
get_issue()
get_transitions()
change_status()
add_comment()
```

The script uses only Python standard-library modules:

```text
argparse
base64
json
os
sys
urllib.error
urllib.parse
urllib.request
```

Therefore no installation such as:

```bash
pip install requests
```

is required.

## 14. Error Handling

The script handles Jira HTTP errors and prints the returned Jira JSON.

Common errors:

### 401 Unauthorized

Likely causes:

- Incorrect email
- Incorrect API token
- Revoked API token
- Missing environment variable

Check:

```bash
echo "$JIRA_EMAIL"
echo "$JIRA_TOKEN"
```

Avoid printing the token in shared terminals or screenshots.

### 403 Forbidden

Authentication may be valid, but the Jira account may not have the required project/issue permission.

Check Jira project permissions.

### 400 Bad Request

Usually indicates an invalid payload, missing required field, invalid field value, or invalid workflow transition.

Inspect the JSON error returned by Jira.

### Status cannot be changed

Run:

```bash
python3 jira_tool.py transitions KAN-123
```

The requested status may not be available from the current workflow state.

## 15. Extending the Script

Potential future commands:

```text
update
delete
assign
priority
label
due-date
link
attachment
search
bulk-create
bulk-comment
```

For example, a future command could be:

```bash
python3 jira_tool.py assign KAN-123 ACCOUNT_ID
```

or:

```bash
python3 jira_tool.py priority KAN-123 High
```

When implementing new commands, follow the same pattern:

```text
CLI argument
    ↓
validate input
    ↓
Jira REST API request
    ↓
display result
```

## 16. Important Security Rules

Never use:

```python
JIRA_TOKEN = "ATATT..."
```

inside source code.

Never commit:

```text
jira_tool.py
.env
config.json
```

if they contain credentials.

Prefer:

```bash
export JIRA_EMAIL="..."
export JIRA_TOKEN="..."
```

For CI/CD such as Jenkins, store the token as a Jenkins Secret/Text Credential and inject it into the environment.

If a token is accidentally exposed, revoke it immediately and create a replacement.

## 17. Current Environment

The intended environment is:

```text
OS: macOS
Shell: zsh
Python command: python3
Jira: Jira Cloud
API: REST API v3
Project: KAN
Issue Type: Task
Task Issue Type ID: 10004
```

Use:

```bash
python3 --version
```

to verify Python.

Do not assume:

```bash
python
```

exists on macOS.

## 18. Example Complete Session

```bash
export JIRA_BASE_URL="https://anhkhoidev1511619.atlassian.net"
export JIRA_EMAIL="your-email@example.com"
export JIRA_TOKEN="YOUR_API_TOKEN"

python3 jira_tool.py create \
  "Fix socket timeout handling" \
  "Investigate socket timeout and thread accumulation." \
  --priority High
```

Then, if Jira returns:

```text
Key: KAN-123
```

run:

```bash
python3 jira_tool.py get KAN-123
```

Check workflow:

```bash
python3 jira_tool.py transitions KAN-123
```

Move to In Progress:

```bash
python3 jira_tool.py status KAN-123 "In Progress"
```

Add comment:

```bash
python3 jira_tool.py comment KAN-123 \
  "Investigation has started."
```

Complete:

```bash
python3 jira_tool.py comment KAN-123 \
  "Fix implemented and verification completed."
```

Finally:

```bash
python3 jira_tool.py status KAN-123 "Done"
```

## Progress mapping for pull requests

Use this progress rule when work is implemented through a GitHub pull request:

- A pull request is being created or is open: progress is **70%** and Jira
  status is `In Progress`.
- The pull request is confirmed merged into the target branch: progress is
  **100%** and Jira status is `Done`.

Update Jira with the matching status and a progress comment:

```powershell
python .\codex\api-jira\jira_tool.py progress KAN-7 70 --note "Pull request is open."
python .\codex\api-jira\jira_tool.py progress KAN-7 100 --note "Pull request merged into main."
```

Do not mark 100% merely because a pull request was created or closed; verify
the GitHub `merged` field first:

```powershell
python .\codex\api-github\github_tool.py merge-status 3
```

## 19. Source of Project Configuration

The project configuration was obtained from the Jira REST API endpoint for issue creation metadata.

The API confirmed:

```text
Project Key: KAN
Project ID: 10000
Issue Type: Task
Task ID: 10004
Summary: required
Project: required
Reporter: required with default value
Description: optional
Priority: optional
Assignee: optional
Due date: optional
Labels: optional
```

Do not assume these values apply to another Jira project. Query the target project's metadata before reusing the skill elsewhere.
