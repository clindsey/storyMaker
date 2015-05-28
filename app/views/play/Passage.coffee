require 'helpers/play'

PassageContentView = Marionette.ItemView.extend
  template: require('templates')(Handlebars)['app/templates/play/passage.hbs']

  className: 'play-passage-content'

module.exports = PassageContentView
