window.require.register("views/stories/ListEmpty", function(require, module) {var ListEmptyView;

ListEmptyView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/stories/listEmpty.hbs'],
  tagName: 'li'
});

module.exports = ListEmptyView;
});
