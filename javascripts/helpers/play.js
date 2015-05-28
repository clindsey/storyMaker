window.require.register("helpers/play", function(require, module) {Handlebars.registerHelper('passageLinks', function(links, storyId) {
  var link, options, outputHtml, passageId, passageLinkTemplate, passagesCollection;
  passageLinkTemplate = require('templates')(Handlebars)['app/templates/play/passageLink.hbs'];
  passagesCollection = require('collections/passages');
  outputHtml = '';
  for (passageId in links) {
    link = links[passageId];
    options = {
      storyId: storyId,
      passageId: passageId,
      title: passagesCollection.get(passageId).get('title')
    };
    outputHtml += passageLinkTemplate(options);
  }
  return outputHtml;
});
});
