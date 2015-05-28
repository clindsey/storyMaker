window.require.register("application", function(require, module) {var application;

application = new Backbone.Marionette.Application();

application.addRegions({
  contentRegion: '#content'
});

application.addInitializer(function() {
  require('routers/home');
  require('routers/story');
  return require('routers/play');
});

module.exports = application;
});
