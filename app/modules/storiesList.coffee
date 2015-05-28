application = require 'application'

application.module 'storiesListModule', ->
  @display = (region) ->
    createStoriesList region

createStoriesList = (region) ->
  StoriesListView = require 'views/stories/List'
  collection = require 'collections/stories'
  storiesListView = new StoriesListView {collection}
  region.show storiesListView
