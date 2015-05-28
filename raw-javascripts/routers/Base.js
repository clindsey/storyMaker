var BaseRouter, application;

application = require('application');

BaseRouter = Marionette.AppRouter.extend({
  initialize: function() {
    return this.listenTo(application.vent, 'navigate:link', this.onNavigateLink);
  },
  onNavigateLink: function(_arg) {
    var href;
    href = _arg.href;
    return this.navigate(href, {
      trigger: true
    });
  }
});

module.exports = BaseRouter;
