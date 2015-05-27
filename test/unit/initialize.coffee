tests = [
  # path to module test file names
  'test/unit/router'
]

for test in tests
  require test

if window.mochaPhantomJS
  mochaPhantomJS.run()
else
  runner = mocha.run()

  runner.on 'end', ->
    if _$jscoverage?
      new MochaCov
