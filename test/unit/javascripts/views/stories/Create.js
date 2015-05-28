window.require.register("views/stories/Create", function(require, module) {var CreateView, StoryModel, storiesCollection;

StoryModel = require('models/Story');

storiesCollection = require('collections/stories');

CreateView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/stories/create.hbs'],
  ui: {
    title: '#storyCreateTitle',
    content: '#storyCreateContent'
  },
  events: {
    'submit form': 'onFormSubmit'
  },
  onFormSubmit: function($event) {
    $event.preventDefault();
    storiesCollection.create({
      title: this.ui.title.val(),
      content: this.ui.content.val()
    }, {
      wait: true
    });
    this.ui.title.val('');
    return this.ui.content.val('');
  }
});

module.exports = CreateView;
});
