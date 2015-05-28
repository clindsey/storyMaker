application = require 'application'
filteredCollection = require 'collections/filteredCollection'
storiesCollection = require 'collections/stories'
passagesCollection = require 'collections/passages'

application.module 'playModule', ->
  @display = (region, storyId, passageId) ->
    playContentView = new (require 'views/play/Content')
    region.show playContentView
    createPlayStory playContentView, storyId, passageId
    createPlayPassage playContentView, storyId, passageId

createPlayStory = (region, storyId, passageId)->
  model = storiesCollection.get storyId
  PlayStoryView = require 'views/play/Story'
  playStoryView = new PlayStoryView {model}
  region.storyRegion.show playStoryView

createPlayPassage = (region, storyId, passageId)->
  unless passageId
    model = passagesCollection.findWhere({isMain: true, storyId})
  unless model
    model = passagesCollection.get passageId
  PlayPassageView = require 'views/play/Passage'
  playPassageView = new PlayPassageView {model}
  region.passageRegion.show playPassageView
