var application, createStoriesCreate, createStoriesList;

application = require('application');

application.module('homeContentModule', function() {
  return this.display = function(region) {
    var homeContentView;
    homeContentView = new (require('views/HomeContent'));
    region.show(homeContentView);
    createStoriesList(homeContentView);
    return createStoriesCreate(homeContentView);
  };
});

createStoriesList = function(homeContentView) {
  require('modules/storiesList');
  return application.storiesListModule.display(homeContentView.storiesListRegion);
};

createStoriesCreate = function(homeContentView) {
  require('modules/storyCreate');
  return application.storyCreateModule.display(homeContentView.storyCreateRegion);
};
