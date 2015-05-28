window.require.register("modules/play", function(require, module) {var application, createPlayPassage, createPlayStory, filteredCollection, passagesCollection, storiesCollection;

application = require('application');

filteredCollection = require('collections/filteredCollection');

storiesCollection = require('collections/stories');

passagesCollection = require('collections/passages');

application.module('playModule', function() {
  return this.display = function(region, storyId, passageId) {
    var playContentView;
    playContentView = new (require('views/play/Content'));
    region.show(playContentView);
    createPlayStory(playContentView, storyId, passageId);
    return createPlayPassage(playContentView, storyId, passageId);
  };
});

createPlayStory = function(region, storyId, passageId) {
  var PlayStoryView, model, playStoryView;
  model = storiesCollection.get(storyId);
  PlayStoryView = require('views/play/Story');
  playStoryView = new PlayStoryView({
    model: model
  });
  return region.storyRegion.show(playStoryView);
};

createPlayPassage = function(region, storyId, passageId) {
  var PlayPassageView, model, playPassageView;
  if (!passageId) {
    model = passagesCollection.findWhere({
      isMain: true,
      storyId: storyId
    });
  }
  if (!model) {
    model = passagesCollection.get(passageId);
  }
  PlayPassageView = require('views/play/Passage');
  playPassageView = new PlayPassageView({
    model: model
  });
  return region.passageRegion.show(playPassageView);
};
});
