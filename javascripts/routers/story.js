window.require.register("routers/story", function(require, module) {var BaseRouter, StoryRouter;

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
