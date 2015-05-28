BaseRouter = require 'routers/Base'

PlayRouter = BaseRouter.extend
  controller: require 'controllers/play'
  appRoutes:
    'play/:storyId/': 'playRoute'
    'play/:storyId/:passageId/': 'playRoute'

module.exports = new PlayRouter
