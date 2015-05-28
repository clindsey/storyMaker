var BaseController, PlayController, application;

BaseController = require('controllers/Base');

application = require('application');

PlayController = BaseController.extend({
  playRoute: function(storyId, passageId) {
    var passagesCollection, storiesCollection;
    storiesCollection = require('collections/stories');
    passagesCollection = require('collections/passages');
    return $.when(storiesCollection.fetch(), passagesCollection.fetch()).then(function() {
      require('modules/play');
      return application.playModule.display(application.contentRegion, storyId, passageId);
    });
  }
});

module.exports = new PlayController;
