BaseController = require 'controllers/Base'
application = require 'application'

StoryController = BaseController.extend
  viewStoryRoute: (id) ->
    storiesCollection = require 'collections/stories'
    passagesCollection = require 'collections/passages'
    $.when(storiesCollection.fetch(), passagesCollection.fetch())
    .then ->
      storyModel = storiesCollection.get id
      require 'modules/storyDetails'
      application.storyDetailsModule.display application.contentRegion, storyModel

module.exports = new StoryController
