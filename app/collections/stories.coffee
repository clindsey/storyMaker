StoryModel = require 'models/Story'

StoriesCollection = Backbone.Collection.extend
  url: 'testData/stories.json'
  model: StoryModel

module.exports = new StoriesCollection
