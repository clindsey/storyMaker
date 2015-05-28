ListItemView = require 'views/passages/ListItem'
ListEmptyView = require 'views/passages/ListEmpty'
passagesCollection = require 'collections/passages'

PassagesListView = Marionette.CompositeView.extend
  className: 'passages-list-view'

  template: require('templates')(Handlebars)['app/templates/passages/list.hbs']
  childViewContainer: '.list-container'

  childView: ListItemView
  emptyView: ListEmptyView

  ui:
    radio: 'input[type=radio]'

  events:
    'click @ui.radio': 'onRadioClick'

  onRadioClick: ->
    id = @$el.find('input:checked').val()
    mainModel = @collection.findWhere({isMain: true})[0]
    mainModel.set({isMain: false}).save()
    targetModel = passagesCollection.get id
    targetModel.set({isMain: true}).save()
    @collection.where()

  serializeData: ->
    {
      "collection": @collection
    }

module.exports = PassagesListView
