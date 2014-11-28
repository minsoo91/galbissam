window.Galbissam.Collections.Restaurants = Backbone.Collection.extend({
	model: Galbissam.Models.Restaurant,
	url: "api/restaurants",

	getOrFetch: function (id) {
		var restaurants = this;
		var restaurant = restaurants.get(id);
		if (!restaurant) {
			restaurant = new Galbissam.Models.Restaurant({ id: id});
			restaurant.fetch();
		}

		return restaurant;
	}
})

Galbissam.Collections.restaurants = new Galbissam.Collections.Restaurants();