application = require 'application'

ListItemView = Marionette.ItemView.extend
  template: require('templates')(Handlebars)['app/templates/stories/listItem.hbs']

  className: 'col-md-12'

  events:
    'click a': 'onClick'

  tagName: 'li'

  onClick: ($event) ->
    $event.preventDefault()
    href = $($event.currentTarget).attr 'href'
    application.vent.trigger 'navigate:link', {href}

module.exports = ListItemView
