window.Galbissam = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var collection = new Galbissam.Collections.Photos();
    collection.fetch({
      data: { page: 1 },
      success: function () {
        new Galbissam.Routers.Router({
          collection: collection,
          $rootEl: $('#content')
        });
        globalAutoComplete = new Galbissam.Views.Autocomplete();
        globalAutoComplete.render();
        Backbone.history.start();        
      }
    })
  }
};

$(document).ready(function(){
  Galbissam.initialize();
});
