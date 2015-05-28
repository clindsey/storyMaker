application = require 'application'

application.module 'storyCreateModule', ->
  @display = (region) ->
    createStoryCreate region

createStoryCreate = (region) ->
  StoryCreateView = require 'views/stories/Create'
  storyCreateView = new StoryCreateView
  region.show storyCreateView
