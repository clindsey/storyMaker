module.exports = function(original) {
  var filtered;
  filtered = new original.constructor();
  filtered._callbacks = {};
  filtered.where = function(criteria) {
    var items;
    if (criteria) {
      items = original.where(criteria);
    } else {
      items = original.models;
    }
    filtered._currentCriteria = criteria;
    return filtered.reset(items);
  };
  original.on('reset', function() {
    return filtered.where(filtered._currentCriteria);
  });
  return filtered;
};
