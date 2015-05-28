application = require 'application'
filteredCollection = require 'collections/filteredCollection'

application.module 'storyDetailsModule', ->
  @display = (region, storyId, passageId) ->
    storyContentView = new (require 'views/stories/Content')
    region.show storyContentView
    filteredPassagesCollection = createFilteredPassages storyId
    createStoryDetails storyContentView, storyId
    createPassagesList storyContentView, filteredPassagesCollection, storyId
    if passageId
      createPassageDetails storyContentView, filteredPassagesCollection, storyId, passageId
    else
      createPassageCreate storyContentView, filteredPassagesCollection, storyId

createFilteredPassages = (storyId) ->
  passagesCollection = require 'collections/passages'
  filteredPassagesCollection = filteredCollection passagesCollection
  filteredPassagesCollection.where {storyId}
  filteredPassagesCollection

createPassageCreate = (storyContentView, collection, storyId) ->
  PassageCreateView = require 'views/passages/Create'
  passageCreateView = new PassageCreateView {storyId, collection}
  storyContentView.passageDetailsRegion.show passageCreateView

createStoryDetails = (storyContentView, id) ->
  StoryDetailsView = require 'views/stories/Details'
  storyDetailsView = new StoryDetailsView {id}
  storyContentView.storyDetailsRegion.show storyDetailsView

createPassagesList = (storyContentView, collection, storyId) ->
  PassagesListView = require 'views/passages/List'
  passagesListView = new PassagesListView {collection}
  storyContentView.passagesListRegion.show passagesListView

createPassageDetails = (storyContentView, collection, storyId, id) ->
  passagesCollection = require 'collections/passages'
  model = passagesCollection.get id
  PassageDetailsView = require 'views/passages/Details'
  passageDetailsView = new PassageDetailsView {storyId, model, collection}
  storyContentView.passageDetailsRegion.show passageDetailsView
