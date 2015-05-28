window.require.register("views/stories/ListItem", function(require, module) {var ListItemView, application;

application = require('application');

ListItemView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/stories/listItem.hbs'],
  className: 'col-md-12',
  events: {
    'click a': 'onClick'
  },
  tagName: 'li',
  onClick: function($event) {
    var href;
    $event.preventDefault();
    href = $($event.currentTarget).attr('href');
    return application.vent.trigger('navigate:link', {
      href: href
    });
  }
});

module.exports = ListItemView;
});
