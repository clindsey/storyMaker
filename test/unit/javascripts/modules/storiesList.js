window.require.register("modules/storiesList", function(require, module) {var application, createStoriesList;

application = require('application');

application.module('storiesListModule', function() {
  return this.display = function(region) {
    return createStoriesList(region);
  };
});

createStoriesList = function(region) {
  var StoriesListView, collection, storiesListView;
  StoriesListView = require('views/stories/List');
  collection = require('collections/stories');
  storiesListView = new StoriesListView({
    collection: collection
  });
  return region.show(storiesListView);
};
});
