var BaseController, HomeController, application;

BaseController = require('controllers/Base');

application = require('application');

HomeController = BaseController.extend({
  defaultRoute: function(parameters) {
    var params, storiesCollection;
    params = this.parseQueryParams(parameters);
    storiesCollection = require('collections/stories');
    return $.when(storiesCollection.fetch()).then(function() {
      require('modules/homeContent');
      return application.homeContentModule.display(application.contentRegion);
    });
  }
});

module.exports = new HomeController;
