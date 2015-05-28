window.require.register("collections/stories", function(require, module) {var StoriesCollection, StoryModel;

StoryModel = require('models/Story');

StoriesCollection = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage('StoriesCollection'),
  model: StoryModel
});

module.exports = new StoriesCollection;
});
