Handlebars.registerHelper 'passageLinks', (links, storyId) ->
  passageLinkTemplate = require('templates')(Handlebars)['app/templates/play/passageLink.hbs']
  passagesCollection = require 'collections/passages'
  outputHtml = ''
  for passageId, link of links
    options = {
      storyId
      passageId
      title: passagesCollection.get(passageId).get 'title'
    }
    outputHtml += passageLinkTemplate options
  outputHtml
