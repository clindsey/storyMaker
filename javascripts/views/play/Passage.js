window.require.register("views/play/Passage", function(require, module) {var PassageContentView;

require('helpers/play');

PassageContentView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/play/passage.hbs'],
  className: 'play-passage-content'
});

module.exports = PassageContentView;
});
