window.Galbissam.Routers.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl
	},

	routes: {
		"":"index",
		"photos/new": "newPhoto",
		"photos/:id": "showPhoto",
		"restaurants/:id": "showRestaurant",
		"users/:id": "showUser"
	},

	index: function () {
		Galbissam.Collections.photos.fetch();
		
		var indexView = new Galbissam.Views.PhotosIndex({
			collection: Galbissam.Collections.photos
		});

		this._swapView(indexView);
	},

	newPhoto: function () {
		var newView = new Galbissam.Views.PhotoForm({
			model: new Galbissam.Models.Photo()
		})

		this._swapView(newView)
	},

	showPhoto: function (id) {
		var photo = Galbissam.Collections.photos.getOrFetch(id);
		var user = new Galbissam.Models.User();
		var showView = new Galbissam.Views.PhotoShow({
			model: photo,
			user: user
		});

		this._swapView(showView);
	},

	showRestaurant: function (id) {
		var restaurant = Galbissam.Collections.restaurants.getOrFetch(id);
		var restaurantShowView = new Galbissam.Views.RestaurantShow({
			model: restaurant,
			collection: Galbissam.Collections.restaurants
		})
  
		this._swapView(restaurantShowView)
	},

	showUser: function (id) {
		var user = Galbissam.Collections.users.getOrFetch(id);
		var userShowView = new Galbissam.Views.UserShow({
			model: user,
			collection: Galbissam.Collections.users
		})

		this._swapView(userShowView)
	},

	_swapView: function (view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;

		this.$rootEl.html(view.render().$el);

	}
})