var expect = require("chai").expect;
var JiraUpdates = require('../jira-updates');

var issue = {
    'self': 'https://business.atlassian.net/browse/DB-360',
    'key': 'OVR-9000',
    'fields': {
        'summary': 'SUPER SAYAN'
    }
},
user = {
    'displayName': 'Son Goku'
},
comment = {
    'updateAuthor': {
        'displayName': 'Son Goku'
    },
};

describe("Jira Update", function() {
    describe("isJiraUpdateSupported", function() {
        it("When issue and user are part of the data, returns true", function() {
            // Arrange
            var testData = {
                'issue': issue,
                'user': user
            };

            // Act
            var result = JiraUpdates.isJiraUpdateSupported(testData);

            // Assert
            expect(result).to.be.true;
        });
        it("When issue and comment are a part of the data, returns true", function() {
            // Arrange
            var testData = {
                'issue': comment,
                'user': user
            };

            // Act
            var result = JiraUpdates.isJiraUpdateSupported(testData);

            // Assert
            expect(result).to.be.true;
        });
        it("When neither user nor comment are part of the data, returns false", function() {
            // Arrange
            var testData = {
                'user': user
            };

            // Act
            var result = JiraUpdates.isJiraUpdateSupported(testData);

            // Assert
            expect(result).to.be.false;
        });
    });
    describe("buildSlackMessage", function() {
        it("When issue and user are included in the data, message successfully built.", function() {
            // Arrange
            var testData = {
                'user': user,
                'issue': issue
            };

            // Act
            var message = JiraUpdates.buildSlackMessage(testData);

            // Assert
            expect(message).to.equal('*Son Goku* updated <https://business.atlassian.net/browse/DB-360|OVR-9000: SUPER SAYAN>');
        });
        it("When issue and comment are included in the data, message successfully built.", function() {
            // Arrange
            var testData = {
                'issue': issue,
                'comment': comment
            };

            // Act
            var message = JiraUpdates.buildSlackMessage(testData);

            // Assert
            expect(message).to.equal('*Son Goku* updated <https://business.atlassian.net/browse/DB-360|OVR-9000: SUPER SAYAN>');
        });
    });
});