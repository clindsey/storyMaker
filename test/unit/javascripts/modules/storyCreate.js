window.require.register("modules/storyCreate", function(require, module) {var application, createStoryCreate;

application = require('application');

application.module('storyCreateModule', function() {
  return this.display = function(region) {
    return createStoryCreate(region);
  };
});

createStoryCreate = function(region) {
  var StoryCreateView, storyCreateView;
  StoryCreateView = require('views/stories/Create');
  storyCreateView = new StoryCreateView;
  return region.show(storyCreateView);
};
});
