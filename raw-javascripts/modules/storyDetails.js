var application, createFilteredPassages, createPassageCreate, createPassageDetails, createPassagesList, createStoryDetails, filteredCollection;

application = require('application');

filteredCollection = require('collections/filteredCollection');

application.module('storyDetailsModule', function() {
  return this.display = function(region, storyId, passageId) {
    var filteredPassagesCollection, storyContentView;
    storyContentView = new (require('views/stories/Content'));
    region.show(storyContentView);
    filteredPassagesCollection = createFilteredPassages(storyId);
    createStoryDetails(storyContentView, storyId);
    createPassagesList(storyContentView, filteredPassagesCollection, storyId);
    if (passageId) {
      return createPassageDetails(storyContentView, filteredPassagesCollection, storyId, passageId);
    } else {
      return createPassageCreate(storyContentView, filteredPassagesCollection, storyId);
    }
  };
});

createFilteredPassages = function(storyId) {
  var filteredPassagesCollection, passagesCollection;
  passagesCollection = require('collections/passages');
  filteredPassagesCollection = filteredCollection(passagesCollection);
  filteredPassagesCollection.where({
    storyId: storyId
  });
  return filteredPassagesCollection;
};

createPassageCreate = function(storyContentView, collection, storyId) {
  var PassageCreateView, passageCreateView;
  PassageCreateView = require('views/passages/Create');
  passageCreateView = new PassageCreateView({
    storyId: storyId,
    collection: collection
  });
  return storyContentView.passageDetailsRegion.show(passageCreateView);
};

createStoryDetails = function(storyContentView, id) {
  var StoryDetailsView, storyDetailsView;
  StoryDetailsView = require('views/stories/Details');
  storyDetailsView = new StoryDetailsView({
    id: id
  });
  return storyContentView.storyDetailsRegion.show(storyDetailsView);
};

createPassagesList = function(storyContentView, collection, storyId) {
  var PassagesListView, passagesListView;
  PassagesListView = require('views/passages/List');
  passagesListView = new PassagesListView({
    collection: collection
  });
  return storyContentView.passagesListRegion.show(passagesListView);
};

createPassageDetails = function(storyContentView, collection, storyId, id) {
  var PassageDetailsView, model, passageDetailsView, passagesCollection;
  passagesCollection = require('collections/passages');
  model = passagesCollection.get(id);
  PassageDetailsView = require('views/passages/Details');
  passageDetailsView = new PassageDetailsView({
    storyId: storyId,
    model: model,
    collection: collection
  });
  return storyContentView.passageDetailsRegion.show(passageDetailsView);
};
