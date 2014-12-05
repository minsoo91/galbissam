window.Galbissam.Routers.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl
	},

	routes: {
		"":"index",
		"photos/new": "newPhoto",
		"photos/:id": "showPhoto",
		"restaurants/:id": "showRestaurant",
		"users/:id": "showUser",
		"menuitems/:id": "showMenuItem"
	},

	index: function () {
		if (typeof sortType === 'undefined') {
    		sortType = null
    	}
		var pagedCollection = new Galbissam.Collections.Photos();
    	pagedCollection.fetch({data: { page: 1, sort: sortType } })
		var indexView = new Galbissam.Views.PhotosIndex({
			collection: pagedCollection
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
		Galbissam.Collections.photos.fetch();
		var photo = Galbissam.Collections.photos.getOrFetch(id);
		var likes = new Galbissam.Collections.Likes({ photo_id: id });
		likes.fetch();
		var user = new Galbissam.Models.User({ id: photo.get("user_id")});
		var showView = new Galbissam.Views.PhotoShow({
			model: photo,
			user: user,
			users: Galbissam.Collections.users,
			likes: likes,
			collection: Galbissam.Collections.photos
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
		// don't get the current user!
		var userShowView = new Galbissam.Views.UserShow({
			model: user,
			collection: Galbissam.Collections.users
		})

		this._swapView(userShowView);
	},

	showMenuItem: function (id) {
		var menuItem = Galbissam.Collections.menuitems.getOrFetch(id);
		var menuItemShowView = new Galbissam.Views.MenuItemShow({
			model: menuItem,
			collection: Galbissam.Collections.menuitems
		})

		this._swapView(menuItemShowView);
	},

	_swapView: function (view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	}
})