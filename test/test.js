var expect = require("chai").expect;
var jiraUpdatesHander = require("../app");

var testData = {
    'issue': {
        'self': 'https://snagajob.atlassian.net/browse/DM-360',
        'key': 'OVR-9000',
        'fields': {
        'summary': 'SUPER SAYAN'
        }
    },
    'user': {
        'displayName': 'Son Goku'
    },
    'transition': {

    }
};

var testContext = {
    'data': testData,
    'secrets': {
        'SLACK_WEBHOOK_URL': 'test_url'
    }
};

describe("Jira Updates Filter", function() {
    describe("Support Check", function() {
        it("No error is returned when issue, user, and transition are part of the data", function() {
            jiraUpdatesHander(testContext, function(error, message) {
                expect(error).to.be.null;
            });
        });
        it("An error is returned when issue data is null", function() {
            testContext.data.user = null;
            jiraUpdatesHander(testContext, function(error, message) {
                expect(error).to.not.be.null;
            });
        });
        it("An error is returned when user data is null", function() {
            testContext.data.user = null;
            jiraUpdatesHander(testContext, function(error, message) {
                expect(error).to.not.be.null;
            });
        });
        it("An error is returned when transition data is null", function() {
            testContext.data.user = null;
            jiraUpdatesHander(testContext, function(error, message) {
                expect(error).to.not.be.null;
            });
        });
    });
});