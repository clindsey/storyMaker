window.require.register("helpers/passages", function(require, module) {Handlebars.registerHelper('passagesSelect', function(storyId, passageId) {
  var collection, linkTemplate, linksLookup, model, outputHtml, passagesCollection;
  linkTemplate = require('templates')(Handlebars)['app/templates/passages/link.hbs'];
  passagesCollection = require('collections/passages');
  collection = require('collections/filteredCollection')(passagesCollection);
  collection.where({
    storyId: storyId
  });
  linksLookup = {};
  if (passageId) {
    model = passagesCollection.get(passageId);
    linksLookup = model.get('links') || linksLookup;
  }
  outputHtml = '';
  collection.each(function(passageModel, i) {
    var id, options;
    id = passageModel.get('id');
    if (id === passageId) {
      return;
    }
    options = {
      model: passageModel.toJSON(),
      isChecked: linksLookup[id]
    };
    return outputHtml += linkTemplate(options);
  });
  return outputHtml;
});
});
