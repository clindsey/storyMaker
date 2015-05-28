PassageModel = require 'models/Passage'

PassagesCollection = Backbone.Collection.extend
  url: 'testData/passages.json'
  model: PassageModel

module.exports = new PassagesCollection
