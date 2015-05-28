window.require.register("controllers/Base", function(require, module) {var BaseController;

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
