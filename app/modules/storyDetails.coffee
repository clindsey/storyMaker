application = require 'application'

application.module 'storyDetailsModule', ->
  @display = (region, model) ->
    StoryDetailsView = require 'views/stories/Details'
    storyDetailsView = new StoryDetailsView {model}
    region.show storyDetailsView
    createStoryPassages storyDetailsView, model

createStoryPassages = (storyDetailsView, model) ->
  collection = require 'collections/passages'
  PassagesListView = require 'views/passages/List'
  passagesListView = new PassagesListView {collection}
  storyDetailsView.passagesListRegion.show passagesListView
