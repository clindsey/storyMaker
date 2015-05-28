BaseRouter = require 'routers/Base'

StoryRouter = BaseRouter.extend
  controller: require 'controllers/story'
  appRoutes:
    'story/:id/': 'viewStoryRoute'

module.exports = new StoryRouter
