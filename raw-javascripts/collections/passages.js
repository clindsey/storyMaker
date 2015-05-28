var PassageModel, PassagesCollection;

PassageModel = require('models/Passage');

PassagesCollection = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage('PassagesCollection'),
  model: PassageModel
});

module.exports = new PassagesCollection;
