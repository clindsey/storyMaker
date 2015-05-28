ListItemView = require 'views/passages/ListItem'
ListEmptyView = require 'views/passages/ListEmpty'

PassagesListView = Marionette.CompositeView.extend
  className: 'passages-list-view'

  template: require('templates')(Handlebars)['app/templates/passages/list.hbs']
  childViewContainer: '.list-container'

  childView: ListItemView
  emptyView: ListEmptyView

  serializeData: ->
    {
      "collection": @collection
    }

module.exports = PassagesListView
