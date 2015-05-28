BaseController = require 'controllers/Base'
application = require 'application'

StoryController = BaseController.extend
  viewStoryRoute: (id) ->
    storiesCollection = require 'collections/stories'
    passagesCollection = require 'collections/passages'
    $.when(storiesCollection.fetch(), passagesCollection.fetch())
    .then ->
      require 'modules/storyDetails'
      application.storyDetailsModule.display application.contentRegion, id

  viewPassageRoute: (storyId, id) ->
    storiesCollection = require 'collections/stories'
    passagesCollection = require 'collections/passages'
    $.when(storiesCollection.fetch(), passagesCollection.fetch())
    .then ->
      require 'modules/storyDetails'
      application.storyDetailsModule.display application.contentRegion, storyId, id

module.exports = new StoryController
