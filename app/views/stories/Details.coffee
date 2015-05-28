storiesCollection = require 'collections/stories'

DetailsView = Marionette.ItemView.extend
  template: require('templates')(Handlebars)['app/templates/stories/details.hbs']

  ui:
    title: '#storyDetailsTitle'
    content: '#storyDetailsContent'

  events:
    'submit form': 'onFormSubmit'

  initialize: (id) ->
    @model = storiesCollection.get id

  onFormSubmit: ($event) ->
    $event.preventDefault()
    title = @ui.title.val()
    content = @ui.content.val()
    @model.set {title, content}
    @model.save()

  className: 'story-details-view'

module.exports = DetailsView
