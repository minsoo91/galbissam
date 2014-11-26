window.Galbissam = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	new Galbissam.Routers.Router({
  		$rootEl: $('#content')
  	});
  	Backbone.history.start();
  }
};

$(document).ready(function(){
  Galbissam.initialize();
});
