var DetailsView, storiesCollection;

storiesCollection = require('collections/stories');

DetailsView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/stories/details.hbs'],
  ui: {
    title: '#storyDetailsTitle',
    content: '#storyDetailsContent'
  },
  events: {
    'submit form': 'onFormSubmit'
  },
  initialize: function(id) {
    return this.model = storiesCollection.get(id);
  },
  onFormSubmit: function($event) {
    var content, title;
    $event.preventDefault();
    title = this.ui.title.val();
    content = this.ui.content.val();
    this.model.set({
      title: title,
      content: content
    });
    return this.model.save();
  },
  className: 'story-details-view'
});

module.exports = DetailsView;
