application = new Backbone.Marionette.Application()

application.addRegions
  contentRegion: '#content'

application.addInitializer ->

module.exports = application
