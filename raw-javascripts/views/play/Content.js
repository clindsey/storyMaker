var PlayContentView, application;

application = require('application');

PlayContentView = Backbone.Marionette.LayoutView.extend({
  template: require('templates')(Handlebars)['app/templates/play/content.hbs'],
  className: 'play-content-view',
  regions: {
    storyRegion: '#story-content',
    passageRegion: '#passage-content'
  }
});

module.exports = PlayContentView;
