# jira-updates-filter
Jira webhooks can be configured using customized JQL queries to send issue updates that meet particular criteria, while the Slack integration for Jira cannot. This webtask is a webhook endpoint that transforms the Jira payload into a Slack message and passes it along.
