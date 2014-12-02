$(document).ready(function() {
	var menuItems = [];
	var restaurants = [];

	$.ajax('api/photos', {
		success: function (data) {
			for (var i = 0; i < data.length; i++) {
				menuItems.push(data[i].name)
			}
			var foodItems = new Bloodhound({
			  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
			  queryTokenizer: Bloodhound.tokenizers.whitespace,
			  local: $.map(menuItems, function(photo) { return { value: photo }; })
			});
			foodItems.initialize();

	 		$.ajax('api/restaurants', {
	 			success: function (data) {
	 				for (var i = 0; i < data.length; i++) {
	 					restaurants.push(data[i].name)
	 				}
	 				var restaurantList = new Bloodhound({
	 					datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	 					queryTokenizer: Bloodhound.tokenizers.whitespace,
	 					local: $.map(restaurants, function(location) { return { value: location}; })
	 				})
	 				restaurantList.initialize();

	 				$('#search').typeahead({
					  hint: true,
					  highlight: true,
					  minLength: 1
					},
					{
					  name: 'photos',
					  displayKey: 'value',
					  // `ttAdapter` wraps the suggestion engine in an adapter that
					  // is compatible with the typeahead jQuery plugin
					  source: foodItems.ttAdapter(),
					  templates: {
					  	header: '<h4 class="dataset-header">Menu Items</h4>'
					  }
					},
					{
						name: 'Restaurants',
						displayKey: 'value',
						source: restaurantList.ttAdapter(),
						templates: {
							header: '<h4 class="dataset-header">Restaurants</h4>'
						}
					});
			 	}
			 });
		}
	});
});

