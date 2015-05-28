idGenerator = require 'idGenerator'
StoryModel = require 'models/Story'
storiesCollection = require 'collections/stories'

CreateView = Marionette.ItemView.extend
  template: require('templates')(Handlebars)['app/templates/stories/create.hbs']

  ui:
    title: '#storyCreateTitle'
    content: '#storyCreateContent'

  events:
    'submit form': 'onFormSubmit'

  onFormSubmit: ($event) ->
    $event.preventDefault()
    model = new StoryModel
      id: idGenerator.next()
      title: @ui.title.val()
      content: @ui.content.val()
    storiesCollection.add model
    @ui.title.val ''
    @ui.content.val ''

module.exports = CreateView
