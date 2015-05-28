application = require 'application'

StoryContentView = Backbone.Marionette.LayoutView.extend
  template: require('templates')(Handlebars)['app/templates/stories/content.hbs']

  className: 'story-content-view'

  regions:
    storyDetailsRegion: '#story-details'
    passagesListRegion: '#passages-list'
    passageDetailsRegion: '#passage-details'

module.exports = StoryContentView
