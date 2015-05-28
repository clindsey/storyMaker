ListEmptyView = Marionette.ItemView.extend
  template: require('templates')(Handlebars)['app/templates/passages/listEmpty.hbs']

  tagName: 'li'

module.exports = ListEmptyView
