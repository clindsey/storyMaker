require 'helpers/passages'

DetailsView = Marionette.ItemView.extend
  template: require('templates')(Handlebars)['app/templates/passages/details.hbs']

  className: 'passage-details-view'

  ui:
    title: '#passageDetailsTitle'
    content: '#passageDetailsContent'
    links: '.passage-links-list input[type=checkbox]'

  events:
    'submit form': 'onFormSubmit'

  initialize: ({@storyId, @model, @collection}) ->

  getLinks: ->
    links = {}
    for el in @ui.links
      continue unless el.checked
      links[$(el).val()] = true
    links

  onFormSubmit: ($event) ->
    $event.preventDefault()
    title = @ui.title.val()
    content = @ui.content.val()
    links = @getLinks()
    @model.set {title, content, links}
    @model.save()
    @collection.where {@storyId}

module.exports = DetailsView
