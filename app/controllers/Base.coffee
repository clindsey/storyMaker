BaseController = Marionette.Controller.extend
  parseQueryParams: (query) ->
    params = {}
    return params unless query?
    parts = query.split '&'
    for part in parts
      [key, value] = part.split '='
      params[key] = value
    params

module.exports = BaseController
