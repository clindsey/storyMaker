Handlebars.registerHelper 'passagesSelect', (storyId, passageId) ->
  linkTemplate = require('templates')(Handlebars)['app/templates/passages/link.hbs']
  passagesCollection = require 'collections/passages'
  collection = require('collections/filteredCollection') passagesCollection
  collection.where {storyId}
  linksLookup = {}
  if passageId
    model = passagesCollection.get passageId
    linksLookup = model.get('links') || linksLookup
  outputHtml = ''
  collection.each (passageModel, i) ->
    id = passageModel.get 'id'
    return if id is passageId
    options = {
      model: passageModel.toJSON()
      isChecked: linksLookup[id]
    }
    outputHtml += linkTemplate options
  outputHtml
