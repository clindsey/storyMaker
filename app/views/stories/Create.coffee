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
    storiesCollection.create {
      title: @ui.title.val()
      content: @ui.content.val()
    }, {wait: true}
    @ui.title.val ''
    @ui.content.val ''

module.exports = CreateView
