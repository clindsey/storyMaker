window.require.register("views/stories/List", function(require, module) {var ListEmptyView, ListItemView, StoriesListView;

ListItemView = require('views/stories/ListItem');

ListEmptyView = require('views/stories/ListEmpty');

StoriesListView = Marionette.CompositeView.extend({
  className: 'stories-list-view',
  template: require('templates')(Handlebars)['app/templates/stories/list.hbs'],
  childViewContainer: '.list-container',
  childView: ListItemView,
  emptyView: ListEmptyView,
  serializeData: function() {
    return {
      "collection": this.collection
    };
  }
});

module.exports = StoriesListView;
});
