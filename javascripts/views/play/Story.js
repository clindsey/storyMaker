window.require.register("views/play/Story", function(require, module) {var StoryContentView;

StoryContentView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/play/story.hbs'],
  className: 'story-passage-content'
});

module.exports = StoryContentView;
});
