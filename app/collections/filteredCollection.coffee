# http://jsfiddle.net/derickbailey/7tvzF/
module.exports = (original) ->
  filtered = new original.constructor()
  filtered._callbacks = {}
  filtered.where = (criteria) ->
    if criteria
      items = original.where criteria
    else
      items = original.models
    filtered._currentCriteria = criteria
    filtered.reset items
  original.on 'reset', ->
    filtered.where filtered._currentCriteria
  filtered
