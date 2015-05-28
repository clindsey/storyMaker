var BaseController, StoryController, application;

BaseController = require('controllers/Base');

application = require('application');

StoryController = BaseController.extend({
  viewStoryRoute: function(id) {
    var passagesCollection, storiesCollection;
    storiesCollection = require('collections/stories');
    passagesCollection = require('collections/passages');
    return $.when(storiesCollection.fetch(), passagesCollection.fetch()).then(function() {
      require('modules/storyDetails');
      return application.storyDetailsModule.display(application.contentRegion, id);
    });
  },
  viewPassageRoute: function(storyId, id) {
    var passagesCollection, storiesCollection;
    storiesCollection = require('collections/stories');
    passagesCollection = require('collections/passages');
    return $.when(storiesCollection.fetch(), passagesCollection.fetch()).then(function() {
      require('modules/storyDetails');
      return application.storyDetailsModule.display(application.contentRegion, storyId, id);
    });
  }
});

module.exports = new StoryController;
