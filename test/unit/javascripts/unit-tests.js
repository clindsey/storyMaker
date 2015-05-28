window.require.register('test/unit/initialize', function(require, module) {
var runner, test, tests, _i, _len;

tests = ['test/unit/router'];

for (_i = 0, _len = tests.length; _i < _len; _i++) {
  test = tests[_i];
  require(test);
}

if (window.mochaPhantomJS) {
  mochaPhantomJS.run();
} else {
  runner = mocha.run();
  runner.on('end', function() {
    if (typeof _$jscoverage !== "undefined" && _$jscoverage !== null) {
      return new MochaCov;
    }
  });
}

});

window.require.register('test/unit/router', function(require, module) {

describe('router', function() {
  var router;
  router = void 0;
  beforeEach(function() {
    return router = require('router');
  });
  afterEach(function() {});
  return it('has a default route', function() {
    return expect(router.routes['*actions']).to.equal('defaultRoute');
  });
});

});
