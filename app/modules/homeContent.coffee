application = require 'application'

application.module 'homeContentModule', ->
  @display = (region) ->
    homeContentView = new (require 'views/HomeContent')
    region.show homeContentView
    createStoriesList homeContentView
    createStoriesCreate homeContentView

createStoriesList = (homeContentView) ->
  require 'modules/storiesList'
  application.storiesListModule.display homeContentView.storiesListRegion

createStoriesCreate = (homeContentView) ->
  require 'modules/storyCreate'
  application.storyCreateModule.display homeContentView.storyCreateRegion
