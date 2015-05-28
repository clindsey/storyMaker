BaseRouter = require 'routers/Base'

HomeRouter = BaseRouter.extend
  controller: require 'controllers/home'
  appRoutes:
    '?*parameters': 'defaultRoute'
    '': 'defaultRoute'

module.exports = new HomeRouter
