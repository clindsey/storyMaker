var HomeContentView, application;

application = require('application');

HomeContentView = Backbone.Marionette.LayoutView.extend({
  template: require('templates')(Handlebars)['app/templates/homeContent.hbs'],
  className: 'home-content-view',
  regions: {
    storiesListRegion: '#stories-list',
    storyCreateRegion: '#story-create'
  }
});

module.exports = HomeContentView;
