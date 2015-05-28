var CreateView, passagesCollection;

require('helpers/passages');

passagesCollection = require('collections/passages');

CreateView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/passages/create.hbs'],
  ui: {
    title: '#passageDetailsTitle',
    content: '#passageDetailsContent',
    links: '.passage-links-list input[type=checkbox]'
  },
  events: {
    'submit form': 'onFormSubmit'
  },
  initialize: function(_arg) {
    this.storyId = _arg.storyId, this.collection = _arg.collection;
  },
  getLinks: function() {
    var el, id, links, _i, _len, _ref;
    links = {};
    _ref = this.ui.links;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      if (!el.checked) {
        continue;
      }
      id = $(el).val();
      links[id] = id;
    }
    return links;
  },
  onFormSubmit: function($event) {
    var isMain, links;
    $event.preventDefault();
    isMain = this.collection.length === 0;
    links = this.getLinks();
    passagesCollection.create({
      title: this.ui.title.val(),
      content: this.ui.content.val(),
      storyId: this.storyId,
      isMain: isMain,
      links: links
    }, {
      wait: true
    });
    this.ui.title.val('');
    this.ui.content.val('');
    return this.collection.where({
      storyId: this.storyId
    });
  }
});

module.exports = CreateView;
