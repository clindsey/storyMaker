describe 'router', ->
  router = undefined

  beforeEach ->
    router = require 'router'

  afterEach ->

  it 'has a default route', ->
    expect(router.routes['*actions']).to.equal 'defaultRoute'
