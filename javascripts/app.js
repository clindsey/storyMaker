window.require.register('application', function(require, module) {
var application;

application = new Backbone.Marionette.Application();

application.addRegions({
  contentRegion: '#content'
});

application.addInitializer(function() {
  require('routers/home');
  require('routers/story');
  return require('routers/play');
});

module.exports = application;

});

window.require.register('collections/filteredCollection', function(require, module) {

module.exports = function(original) {
  var filtered;
  filtered = new original.constructor();
  filtered._callbacks = {};
  filtered.where = function(criteria) {
    var items;
    if (criteria) {
      items = original.where(criteria);
    } else {
      items = original.models;
    }
    filtered._currentCriteria = criteria;
    return filtered.reset(items);
  };
  original.on('reset', function() {
    return filtered.where(filtered._currentCriteria);
  });
  return filtered;
};

});

window.require.register('collections/passages', function(require, module) {
var PassageModel, PassagesCollection;

PassageModel = require('models/Passage');

PassagesCollection = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage('PassagesCollection'),
  model: PassageModel
});

module.exports = new PassagesCollection;

});

window.require.register('collections/stories', function(require, module) {
var StoriesCollection, StoryModel;

StoryModel = require('models/Story');

StoriesCollection = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage('StoriesCollection'),
  model: StoryModel
});

module.exports = new StoriesCollection;

});

window.require.register('config', function(require, module) {
var config;

config = {};

module.exports = config;

});

window.require.register('controllers/Base', function(require, module) {
var BaseController;

BaseController = Marionette.Controller.extend({
  parseQueryParams: function(query) {
    var key, params, part, parts, value, _i, _len, _ref;
    params = {};
    if (query == null) {
      return params;
    }
    parts = query.split('&');
    for (_i = 0, _len = parts.length; _i < _len; _i++) {
      part = parts[_i];
      _ref = part.split('='), key = _ref[0], value = _ref[1];
      params[key] = value;
    }
    return params;
  }
});

module.exports = BaseController;

});

window.require.register('controllers/home', function(require, module) {
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

});

window.require.register('controllers/play', function(require, module) {
var BaseController, PlayController, application;

BaseController = require('controllers/Base');

application = require('application');

PlayController = BaseController.extend({
  playRoute: function(storyId, passageId) {
    var passagesCollection, storiesCollection;
    storiesCollection = require('collections/stories');
    passagesCollection = require('collections/passages');
    return $.when(storiesCollection.fetch(), passagesCollection.fetch()).then(function() {
      require('modules/play');
      return application.playModule.display(application.contentRegion, storyId, passageId);
    });
  }
});

module.exports = new PlayController;

});

window.require.register('controllers/story', function(require, module) {
var BaseController, StoryController, application;

BaseController = require('controllers/Base');

application = require('application');

StoryController = BaseController.extend({
  viewStoryRoute: function(id) {
    var passagesCollection, storiesCollection;
    storiesCollection = require('collections/stories');
    passagesCollection = require('collections/passages');
    return $.when(storiesCollection.fetch(), passagesCollection.fetch()).then(function() {
      require('modules/storyDetails');
      return application.storyDetailsModule.display(application.contentRegion, id);
    });
  },
  viewPassageRoute: function(storyId, id) {
    var passagesCollection, storiesCollection;
    storiesCollection = require('collections/stories');
    passagesCollection = require('collections/passages');
    return $.when(storiesCollection.fetch(), passagesCollection.fetch()).then(function() {
      require('modules/storyDetails');
      return application.storyDetailsModule.display(application.contentRegion, storyId, id);
    });
  }
});

module.exports = new StoryController;

});

window.require.register('helpers/passages', function(require, module) {

Handlebars.registerHelper('passagesSelect', function(storyId, passageId) {
  var collection, linkTemplate, linksLookup, model, outputHtml, passagesCollection;
  linkTemplate = require('templates')(Handlebars)['app/templates/passages/link.hbs'];
  passagesCollection = require('collections/passages');
  collection = require('collections/filteredCollection')(passagesCollection);
  collection.where({
    storyId: storyId
  });
  linksLookup = {};
  if (passageId) {
    model = passagesCollection.get(passageId);
    linksLookup = model.get('links') || linksLookup;
  }
  outputHtml = '';
  collection.each(function(passageModel, i) {
    var id, options;
    id = passageModel.get('id');
    if (id === passageId) {
      return;
    }
    options = {
      model: passageModel.toJSON(),
      isChecked: linksLookup[id]
    };
    return outputHtml += linkTemplate(options);
  });
  return outputHtml;
});

});

window.require.register('helpers/play', function(require, module) {

Handlebars.registerHelper('passageLinks', function(links, storyId) {
  var link, options, outputHtml, passageId, passageLinkTemplate, passagesCollection;
  passageLinkTemplate = require('templates')(Handlebars)['app/templates/play/passageLink.hbs'];
  passagesCollection = require('collections/passages');
  outputHtml = '';
  for (passageId in links) {
    link = links[passageId];
    options = {
      storyId: storyId,
      passageId: passageId,
      title: passagesCollection.get(passageId).get('title')
    };
    outputHtml += passageLinkTemplate(options);
  }
  return outputHtml;
});

});

window.require.register('index', function(require, module) {
var application;

application = require('application');

application.on('start', function() {
  return Backbone.history.start({
    pushState: false
  });
});

application.start();

});

window.require.register('models/Passage', function(require, module) {
var PassageModel;

PassageModel = Backbone.Model.extend({});

module.exports = PassageModel;

});

window.require.register('models/Story', function(require, module) {
var StoryModel;

StoryModel = Backbone.Model.extend({});

module.exports = StoryModel;

});

window.require.register('modules/homeContent', function(require, module) {
var application, createStoriesCreate, createStoriesList;

application = require('application');

application.module('homeContentModule', function() {
  return this.display = function(region) {
    var homeContentView;
    homeContentView = new (require('views/HomeContent'));
    region.show(homeContentView);
    createStoriesList(homeContentView);
    return createStoriesCreate(homeContentView);
  };
});

createStoriesList = function(homeContentView) {
  require('modules/storiesList');
  return application.storiesListModule.display(homeContentView.storiesListRegion);
};

createStoriesCreate = function(homeContentView) {
  require('modules/storyCreate');
  return application.storyCreateModule.display(homeContentView.storyCreateRegion);
};

});

window.require.register('modules/play', function(require, module) {
var application, createPlayPassage, createPlayStory, filteredCollection, passagesCollection, storiesCollection;

application = require('application');

filteredCollection = require('collections/filteredCollection');

storiesCollection = require('collections/stories');

passagesCollection = require('collections/passages');

application.module('playModule', function() {
  return this.display = function(region, storyId, passageId) {
    var playContentView;
    playContentView = new (require('views/play/Content'));
    region.show(playContentView);
    createPlayStory(playContentView, storyId, passageId);
    return createPlayPassage(playContentView, storyId, passageId);
  };
});

createPlayStory = function(region, storyId, passageId) {
  var PlayStoryView, model, playStoryView;
  model = storiesCollection.get(storyId);
  PlayStoryView = require('views/play/Story');
  playStoryView = new PlayStoryView({
    model: model
  });
  return region.storyRegion.show(playStoryView);
};

createPlayPassage = function(region, storyId, passageId) {
  var PlayPassageView, model, playPassageView;
  if (!passageId) {
    model = passagesCollection.findWhere({
      isMain: true,
      storyId: storyId
    });
  }
  if (!model) {
    model = passagesCollection.get(passageId);
  }
  PlayPassageView = require('views/play/Passage');
  playPassageView = new PlayPassageView({
    model: model
  });
  return region.passageRegion.show(playPassageView);
};

});

window.require.register('modules/storiesList', function(require, module) {
var application, createStoriesList;

application = require('application');

application.module('storiesListModule', function() {
  return this.display = function(region) {
    return createStoriesList(region);
  };
});

createStoriesList = function(region) {
  var StoriesListView, collection, storiesListView;
  StoriesListView = require('views/stories/List');
  collection = require('collections/stories');
  storiesListView = new StoriesListView({
    collection: collection
  });
  return region.show(storiesListView);
};

});

window.require.register('modules/storyCreate', function(require, module) {
var application, createStoryCreate;

application = require('application');

application.module('storyCreateModule', function() {
  return this.display = function(region) {
    return createStoryCreate(region);
  };
});

createStoryCreate = function(region) {
  var StoryCreateView, storyCreateView;
  StoryCreateView = require('views/stories/Create');
  storyCreateView = new StoryCreateView;
  return region.show(storyCreateView);
};

});

window.require.register('modules/storyDetails', function(require, module) {
var application, createFilteredPassages, createPassageCreate, createPassageDetails, createPassagesList, createStoryDetails, filteredCollection;

application = require('application');

filteredCollection = require('collections/filteredCollection');

application.module('storyDetailsModule', function() {
  return this.display = function(region, storyId, passageId) {
    var filteredPassagesCollection, storyContentView;
    storyContentView = new (require('views/stories/Content'));
    region.show(storyContentView);
    filteredPassagesCollection = createFilteredPassages(storyId);
    createStoryDetails(storyContentView, storyId);
    createPassagesList(storyContentView, filteredPassagesCollection, storyId);
    if (passageId) {
      return createPassageDetails(storyContentView, filteredPassagesCollection, storyId, passageId);
    } else {
      return createPassageCreate(storyContentView, filteredPassagesCollection, storyId);
    }
  };
});

createFilteredPassages = function(storyId) {
  var filteredPassagesCollection, passagesCollection;
  passagesCollection = require('collections/passages');
  filteredPassagesCollection = filteredCollection(passagesCollection);
  filteredPassagesCollection.where({
    storyId: storyId
  });
  return filteredPassagesCollection;
};

createPassageCreate = function(storyContentView, collection, storyId) {
  var PassageCreateView, passageCreateView;
  PassageCreateView = require('views/passages/Create');
  passageCreateView = new PassageCreateView({
    storyId: storyId,
    collection: collection
  });
  return storyContentView.passageDetailsRegion.show(passageCreateView);
};

createStoryDetails = function(storyContentView, id) {
  var StoryDetailsView, storyDetailsView;
  StoryDetailsView = require('views/stories/Details');
  storyDetailsView = new StoryDetailsView({
    id: id
  });
  return storyContentView.storyDetailsRegion.show(storyDetailsView);
};

createPassagesList = function(storyContentView, collection, storyId) {
  var PassagesListView, passagesListView;
  PassagesListView = require('views/passages/List');
  passagesListView = new PassagesListView({
    collection: collection
  });
  return storyContentView.passagesListRegion.show(passagesListView);
};

createPassageDetails = function(storyContentView, collection, storyId, id) {
  var PassageDetailsView, model, passageDetailsView, passagesCollection;
  passagesCollection = require('collections/passages');
  model = passagesCollection.get(id);
  PassageDetailsView = require('views/passages/Details');
  passageDetailsView = new PassageDetailsView({
    storyId: storyId,
    model: model,
    collection: collection
  });
  return storyContentView.passageDetailsRegion.show(passageDetailsView);
};

});

window.require.register('routers/Base', function(require, module) {
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

});

window.require.register('routers/home', function(require, module) {
var BaseRouter, HomeRouter;

BaseRouter = require('routers/Base');

HomeRouter = BaseRouter.extend({
  controller: require('controllers/home'),
  appRoutes: {
    '?*parameters': 'defaultRoute',
    '': 'defaultRoute'
  }
});

module.exports = new HomeRouter;

});

window.require.register('routers/play', function(require, module) {
var BaseRouter, PlayRouter;

BaseRouter = require('routers/Base');

PlayRouter = BaseRouter.extend({
  controller: require('controllers/play'),
  appRoutes: {
    'play/:storyId/': 'playRoute',
    'play/:storyId/:passageId/': 'playRoute'
  }
});

module.exports = new PlayRouter;

});

window.require.register('routers/story', function(require, module) {
var BaseRouter, StoryRouter;

BaseRouter = require('routers/Base');

StoryRouter = BaseRouter.extend({
  controller: require('controllers/story'),
  appRoutes: {
    'story/:id/': 'viewStoryRoute',
    'story/:storyId/passage/:id/': 'viewPassageRoute'
  }
});

module.exports = new StoryRouter;

});

window.require.register('views/HomeContent', function(require, module) {
var HomeContentView, application;

application = require('application');

HomeContentView = Backbone.Marionette.LayoutView.extend({
  template: require('templates')(Handlebars)['app/templates/homeContent.hbs'],
  className: 'home-content-view',
  regions: {
    storiesListRegion: '#stories-list',
    storyCreateRegion: '#story-create'
  }
});

module.exports = HomeContentView;

});

window.require.register('views/passages/Create', function(require, module) {
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

});

window.require.register('views/passages/Details', function(require, module) {
var DetailsView;

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

window.require.register('views/passages/List', function(require, module) {
var ListEmptyView, ListItemView, PassagesListView, passagesCollection;

ListItemView = require('views/passages/ListItem');

ListEmptyView = require('views/passages/ListEmpty');

passagesCollection = require('collections/passages');

PassagesListView = Marionette.CompositeView.extend({
  className: 'passages-list-view',
  template: require('templates')(Handlebars)['app/templates/passages/list.hbs'],
  childViewContainer: '.list-container',
  childView: ListItemView,
  emptyView: ListEmptyView,
  ui: {
    radio: 'input[type=radio]'
  },
  events: {
    'click @ui.radio': 'onRadioClick'
  },
  onRadioClick: function() {
    var id, mainModel, targetModel;
    id = this.$el.find('input:checked').val();
    mainModel = this.collection.findWhere({
      isMain: true
    })[0];
    mainModel.set({
      isMain: false
    }).save();
    targetModel = passagesCollection.get(id);
    targetModel.set({
      isMain: true
    }).save();
    return this.collection.where();
  },
  serializeData: function() {
    return {
      "collection": this.collection
    };
  }
});

module.exports = PassagesListView;

});

window.require.register('views/passages/ListEmpty', function(require, module) {
var ListEmptyView;

ListEmptyView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/passages/listEmpty.hbs'],
  tagName: 'li'
});

module.exports = ListEmptyView;

});

window.require.register('views/passages/ListItem', function(require, module) {
var ListItemView, application;

application = require('application');

ListItemView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/passages/listItem.hbs'],
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

window.require.register('views/play/Content', function(require, module) {
var PlayContentView, application;

application = require('application');

PlayContentView = Backbone.Marionette.LayoutView.extend({
  template: require('templates')(Handlebars)['app/templates/play/content.hbs'],
  className: 'play-content-view',
  regions: {
    storyRegion: '#story-content',
    passageRegion: '#passage-content'
  }
});

module.exports = PlayContentView;

});

window.require.register('views/play/Passage', function(require, module) {
var PassageContentView;

require('helpers/play');

PassageContentView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/play/passage.hbs'],
  className: 'play-passage-content'
});

module.exports = PassageContentView;

});

window.require.register('views/play/Story', function(require, module) {
var StoryContentView;

StoryContentView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/play/story.hbs'],
  className: 'story-passage-content'
});

module.exports = StoryContentView;

});

window.require.register('views/stories/Content', function(require, module) {
var StoryContentView, application;

application = require('application');

StoryContentView = Backbone.Marionette.LayoutView.extend({
  template: require('templates')(Handlebars)['app/templates/stories/content.hbs'],
  className: 'story-content-view',
  regions: {
    storyDetailsRegion: '#story-details',
    passagesListRegion: '#passages-list',
    passageDetailsRegion: '#passage-details'
  }
});

module.exports = StoryContentView;

});

window.require.register('views/stories/Create', function(require, module) {
var CreateView, StoryModel, storiesCollection;

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

window.require.register('views/stories/Details', function(require, module) {
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

});

window.require.register('views/stories/List', function(require, module) {
var ListEmptyView, ListItemView, StoriesListView;

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

window.require.register('views/stories/ListEmpty', function(require, module) {
var ListEmptyView;

ListEmptyView = Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/stories/listEmpty.hbs'],
  tagName: 'li'
});

module.exports = ListEmptyView;

});

window.require.register('views/stories/ListItem', function(require, module) {
var ListItemView, application;

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
