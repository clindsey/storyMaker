BaseController = require 'controllers/Base'
application = require 'application'

HomeController = BaseController.extend
  defaultRoute: (parameters) ->
    params = @parseQueryParams parameters
    storiesCollection = require 'collections/stories'
    $.when(storiesCollection.fetch())
    .then ->
      require 'modules/homeContent'
      application.homeContentModule.display application.contentRegion

module.exports = new HomeController
