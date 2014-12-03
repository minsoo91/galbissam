$(document).ready(function() {
	var menuItems = [];
	var restaurants = [];
	var users = [];

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

	 				$.ajax('users', {
	 					success: function (data) {
	 						for (var i = 0; i < data.length; i++) {
	 							users.push(data[i].username)
	 						}
	 						var userList = new Bloodhound({
	 							datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	 							queryTokenizer: Bloodhound.tokenizers.whitespace,
	 							local: $.map(users, function(user) { return { value: user}; })
	 						})
	 						userList.initialize();
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
							},
							{
								name: 'Users',
								displayKey: 'value',
								source: userList.ttAdapter(),
								templates: {
									header: '<h4 class="dataset-header">Users</h4>'
								}
							});
			 			}
			 		})
			 	}
			 });
		}
	});
	$('#search').keypress(function(event) {
		if (event.keyCode == 13) {
			searchSubmit();
		}
	})
	$('#search-submit').on("click", searchSubmit);
});

function searchSubmit(event) {
	if (event) {
		event.preventDefault();
	}
	searchQuery = $('#search').val()
	var photosCollection = Galbissam.Collections.photos.fetch();
	var restaurantsCollection = Galbissam.Collections.restaurants.fetch();
	var usersCollection = Galbissam.Collections.users.fetch();
	// REMEMBER THIS METHOD
	$.when(photosCollection, restaurantsCollection, usersCollection).then(function() {
		photosHash = { photos: arguments[0][0] };
		restaurantsHash = { restaurants: arguments[1][0] };
		usersHash = { users: arguments[2][0] };
		if (matchItem(photosHash.photos, photosHash, searchQuery)) {
			Backbone.history.navigate(matchItem(photosHash.photos, photosHash, searchQuery), { trigger: true })
		} else if (matchItem(restaurantsHash.restaurants, restaurantsHash, searchQuery)) {
			Backbone.history.navigate(matchItem(restaurantsHash.restaurants, restaurantsHash, searchQuery), { trigger: true })
		} else {
			Backbone.history.navigate(matchItem(usersHash.users, usersHash, searchQuery), { trigger: true })
		}
	})

}

function matchItem(items, itemsHash, searchQuery) {
	if (!items[0].name) {
		for (var i = 0; i < items.length; i++) {
			if (items[i].username === searchQuery) {
				return "#/" + Object.keys(itemsHash)[0] + "/" + items[i].id
			}
		}
	} else {
		for (var i = 0; i < items.length; i++) {
			if (items[i].name === searchQuery) {
				return "#/" + Object.keys(itemsHash)[0] + "/" + items[i].id
			}
		}	
	}
}
