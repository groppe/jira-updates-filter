var JiraUpdates = require('./jira-updates');

module.exports = function (context, callback) {
  if (JiraUpdates.isJiraUpdateSupported(context.data))
  {
      var text = JiraUpdates.buildSlackMessage(context.data);
      JiraUpdates.postToSlack(context.secrets.SLACK_WEBHOOK_URL, text);
      callback(null, 'Success');
      return;
  }
  callback('This update is not supported');
}
