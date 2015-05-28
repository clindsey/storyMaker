StoryContentView = Marionette.ItemView.extend
  template: require('templates')(Handlebars)['app/templates/play/story.hbs']

  className: 'story-passage-content'

module.exports = StoryContentView
