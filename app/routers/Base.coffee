application = require 'application'

BaseRouter = Marionette.AppRouter.extend
  initialize: ->
    @listenTo application.vent, 'navigate:link', @onNavigateLink

  onNavigateLink: ({href}) ->
    @navigate href, {trigger: true}

module.exports = BaseRouter
