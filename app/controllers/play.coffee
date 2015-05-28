BaseController = require 'controllers/Base'
application = require 'application'

PlayController = BaseController.extend
  playRoute: (storyId, passageId) ->
    storiesCollection = require 'collections/stories'
    passagesCollection = require 'collections/passages'
    $.when(storiesCollection.fetch(), passagesCollection.fetch())
    .then ->
      require 'modules/play'
      application.playModule.display application.contentRegion, storyId, passageId

module.exports = new PlayController
