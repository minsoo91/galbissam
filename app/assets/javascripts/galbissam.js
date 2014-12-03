window.Galbissam = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	new Galbissam.Routers.Router({
  		$rootEl: $('#content')
  	});
    globalAutoComplete = new Galbissam.Views.Autocomplete();
    globalAutoComplete.render();
  	Backbone.history.start();
  }
};

$(document).ready(function(){
  Galbissam.initialize();
});
