$(document).ready(function() {
	photosCollection = Galbissam.Collections.photos.fetch();
	restaurantsCollection = Galbissam.Collections.restaurants.fetch();
	usersCollection = Galbissam.Collections.users.fetch();
	// REMEMBER THIS METHOD
	$.when(photosCollection, restaurantsCollection, usersCollection).then(function() {
		photosObjects = arguments[0][0]
		restaurantsObjects = arguments[1][0]
		usersObjects = arguments[2][0]
		var photosArray = makeArray(photosObjects);
		var restaurantsArray = makeArray(restaurantsObjects);
		var usersArray = makeArray(usersObjects);

		initializeBloodHound(photosArray, restaurantsArray, usersArray)		
	});
});

function initializeBloodHound(photosArray, restaurantsArray, usersArray) {
	var foodItems = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  local: $.map(photosArray, function(photo) { return { value: photo }; })
	});

	var restaurantList = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local: $.map(restaurantsArray, function(location) { return { value: location}; })
	})
	 				
	var userList = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local: $.map(usersArray, function(user) { return { value: user}; })
	})

	foodItems.initialize();
	restaurantList.initialize();
	userList.initialize();

	initializeTypeAhead(foodItems, restaurantList, userList)
}

function initializeTypeAhead(foodItems, restaurantList, userList) {
	$('#search').typeahead({
	  hint: true,
	  highlight: true,
	  minLength: 1
	},
	{
	  name: 'photos',
	  displayKey: 'value',
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
	pushEntertoSearch();
	$('#search-submit').on("click", searchSubmit);
}

function pushEntertoSearch() {
	$('#search').keypress(function(event) {
		if (event.keyCode == 13) {
			searchSubmit();
		}
	})	
}

function makeArray(ItemsObjects) {
	var itemsArray = []
	if (!ItemsObjects[0].name) {
		for (var i = 0; i < ItemsObjects.length; i++) {
			itemsArray.push(ItemsObjects[i].username)
		}
	} else {
		for (var i = 0; i < ItemsObjects.length; i++) {
			itemsArray.push(ItemsObjects[i].name)
		}
	}

	return itemsArray
}

function searchSubmit(event) {
	if (event) {
		event.preventDefault();
	}
	searchQuery = $('#search').val()
	// REMEMBER THIS METHOD
	$.when(photosCollection, restaurantsCollection, usersCollection).then(function() {
		photosHash = { photos: arguments[0][0] };
		restaurantsHash = { restaurants: arguments[1][0] };
		usersHash = { users: arguments[2][0] };
		navigateToURI(photosHash, restaurantsHash, usersHash, searchQuery)
	})

}

function navigateToURI(photosHash, restaurantsHash, usersHash, searchQuery) {
	if (matchItem(photosHash.photos, photosHash, searchQuery)) {
		Backbone.history.navigate(matchItem(photosHash.photos, photosHash, searchQuery), { trigger: true })
	} else if (matchItem(restaurantsHash.restaurants, restaurantsHash, searchQuery)) {
		Backbone.history.navigate(matchItem(restaurantsHash.restaurants, restaurantsHash, searchQuery), { trigger: true })
	} else {
		Backbone.history.navigate(matchItem(usersHash.users, usersHash, searchQuery), { trigger: true })
	}
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
