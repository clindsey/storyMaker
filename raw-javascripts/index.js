var application;

application = require('application');

application.on('start', function() {
  return Backbone.history.start({
    pushState: false
  });
});

application.start();
