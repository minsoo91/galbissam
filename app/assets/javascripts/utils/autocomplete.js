window.Galbissam.Views.Autocomplete = Backbone.View.extend({
	render: function () {
		view = this;
		var that = this;
		menuitemsCollection = Galbissam.Collections.menuitems.fetch();
		restaurantsCollection = Galbissam.Collections.restaurants.fetch();
		usersCollection = Galbissam.Collections.users.fetch();
		// REMEMBER THIS METHOD
		$.when(menuitemsCollection, restaurantsCollection, usersCollection).then(function() {
			var menuitemsObjects = arguments[0][0]
			var restaurantsObjects = arguments[1][0]
			var usersObjects = arguments[2][0]
			var menuitemsArray = that.makeArray(menuitemsObjects);
			var restaurantsArray = that.makeArray(restaurantsObjects);
			var usersArray = that.makeArray(usersObjects);

			that.initializeBloodHound(menuitemsArray, restaurantsArray, usersArray)		
		});		
	},

	initializeBloodHound: function (menuitemsArray, restaurantsArray, usersArray) {
		var foodItems = new Bloodhound({
		  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		  queryTokenizer: Bloodhound.tokenizers.whitespace,
		  local: $.map(menuitemsArray, function(menuitem) { return { value: menuitem }; })
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

		this.initializeTypeAhead(foodItems, restaurantList, userList)
	},

	initializeTypeAhead: function(foodItems, restaurantList, userList) {
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
		this.pushEntertoSearch();
		$('#search-submit').on("click", this.searchSubmit);
	},
	pushEntertoSearch: function () {
		var that = this;
		$('#search').keypress(function(event) {
			if (event.keyCode == 13) {
				that.searchSubmit();
			}
		})			
	},
	makeArray: function (ItemsObjects) {
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
	},
	searchSubmit: function (event) {
		if (event) {
			event.preventDefault();
		}
		searchQuery = $('#search').val()
		// REMEMBER THIS METHOD
		$.when(menuitemsCollection, restaurantsCollection, usersCollection).then(function() {
			menuitemsHash = { menuitems: arguments[0][0] };
			restaurantsHash = { restaurants: arguments[1][0] };
			usersHash = { users: arguments[2][0] };
			view.navigateToURI(menuitemsHash, restaurantsHash, usersHash, searchQuery)
		})		
	},

	navigateToURI: function (meunitemssHash, restaurantsHash, usersHash, searchQuery) {
		if (this.matchItem(menuitemsHash.menuitems, menuitemsHash, searchQuery)) {
			Backbone.history.navigate(this.matchItem(menuitemsHash.menuitems, menuitemsHash, searchQuery), { trigger: true })
		} else if (this.matchItem(restaurantsHash.restaurants, restaurantsHash, searchQuery)) {
			Backbone.history.navigate(this.matchItem(restaurantsHash.restaurants, restaurantsHash, searchQuery), { trigger: true })
		} else {
			Backbone.history.navigate(this.matchItem(usersHash.users, usersHash, searchQuery), { trigger: true })
		}		
	},

	matchItem: function (items, itemsHash, searchQuery) {
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

});
