require 'helpers/passages'
passagesCollection = require 'collections/passages'

CreateView = Marionette.ItemView.extend
  template: require('templates')(Handlebars)['app/templates/passages/create.hbs']

  ui:
    title: '#passageDetailsTitle'
    content: '#passageDetailsContent'
    links: '.passage-links-list input[type=checkbox]'

  events:
    'submit form': 'onFormSubmit'

  initialize: ({@storyId, @collection}) ->

  getLinks: ->
    links = {}
    for el in @ui.links
      continue unless el.checked
      id = $(el).val()
      links[id] = id
    links

  onFormSubmit: ($event) ->
    $event.preventDefault()
    isMain = @collection.length is 0
    links = @getLinks()
    passagesCollection.create {
      title: @ui.title.val()
      content: @ui.content.val()
      @storyId
      isMain
      links
    }, {wait: true}
    @ui.title.val ''
    @ui.content.val ''
    @collection.where {@storyId}

module.exports = CreateView
