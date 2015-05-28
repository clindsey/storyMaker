window.require.register("views/passages/Details", function(require, module) {var DetailsView;

require('helpers/passages');

DetailsView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/passages/details.hbs'],
  className: 'passage-details-view',
  ui: {
    title: '#passageDetailsTitle',
    content: '#passageDetailsContent',
    links: '.passage-links-list input[type=checkbox]'
  },
  events: {
    'submit form': 'onFormSubmit'
  },
  initialize: function(_arg) {
    this.storyId = _arg.storyId, this.model = _arg.model, this.collection = _arg.collection;
  },
  getLinks: function() {
    var el, links, _i, _len, _ref;
    links = {};
    _ref = this.ui.links;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      if (!el.checked) {
        continue;
      }
      links[$(el).val()] = true;
    }
    return links;
  },
  onFormSubmit: function($event) {
    var content, links, title;
    $event.preventDefault();
    title = this.ui.title.val();
    content = this.ui.content.val();
    links = this.getLinks();
    this.model.set({
      title: title,
      content: content,
      links: links
    });
    this.model.save();
    return this.collection.where({
      storyId: this.storyId
    });
  }
});

module.exports = DetailsView;
});
