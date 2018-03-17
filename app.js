var SlackNotify = require('slack-notify');
const SLACKBOT_NAME = 'JIRA Updates';
const SLACKBOT_ICON = 'https://a.slack-edge.com/7f1a0/plugins/jira/assets/service_512.png';

const isJiraUpdateSupported = (data) => {
  if (data.issue && (data.comment || data.user))
  {
    return true;
  }
}

const buildSlackMessage = (data) => {
  return '*' + data.updateAuthor.displayName + '*'
    + ' updated <' 
    + data.issue.self
    + '|'
    + data.issue.key
    + ': ' + data.issue.fields.summary
    + '>'
}

const postToSlack = (url, text) => {
  var webhook = SlackNotify(url);
  webhook.send({
    icon_url: SLACKBOT_ICON,
    text: text,
    username: SLACKBOT_NAME
  });
}

module.exports = function (context, callback) {
  console.log(context.data);
  if (isJiraUpdateSupported(context.data))
  {
      var text = buildSlackMessage(context.data);
      postToSlack(context.secrets.SLACK_WEBHOOK_URL, text);
      callback(null, 'Success');
      return;
  }

  callback('This update is not supported');
}
