window.require.register("views/passages/ListEmpty", function(require, module) {var ListEmptyView;

ListEmptyView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/passages/listEmpty.hbs'],
  tagName: 'li'
});

module.exports = ListEmptyView;
});
