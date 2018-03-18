var SlackNotify = require('slack-notify');
const SLACKBOT_NAME = 'JIRA Updates';
const SLACKBOT_ICON = 'https://a.slack-edge.com/7f1a0/plugins/jira/assets/service_512.png';

const isJiraUpdateSupported = (data) => {
  if (data.issue && (data.comment || data.user))
  {
    return true;
  }
  return false;
}

const buildSlackMessage = (data) => {
  var issue = data.issue,
      user = data.user ? data.user.displayName : data.comment.updateAuthor.displayName;
  return formatMessage(issue, user);
}

const formatMessage = (issue, user) => {
  return '*' + user + '*'
    + ' updated <' 
    + issue.self
    + '|'
    + issue.key
    + ': ' + issue.fields.summary
    + '>';
}

const postToSlack = (url, text) => {
  var webhook = SlackNotify(url);
  webhook.send({
    icon_url: SLACKBOT_ICON,
    text: text,
    username: SLACKBOT_NAME
  });
}

module.exports.isJiraUpdateSupported = isJiraUpdateSupported;
module.exports.buildSlackMessage = buildSlackMessage;
module.exports.postToSlack = postToSlack;