window.Galbissam.Collections.RestaurantPhotos = Backbone.Collection.extend({
	initialize: function (options) {
		this.restaurant = options.restaurant
	},

	model: Galbissam.Models.Photo,
	
	url: function () {
		return this.restaurant.url() + "/photos"
	}
});