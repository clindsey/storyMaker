DetailsView = Marionette.LayoutView.extend
  template: require('templates')(Handlebars)['app/templates/stories/details.hbs']

  className: 'story-details-view'

  regions:
    passagesListRegion: '#passages-list'

module.exports = DetailsView
