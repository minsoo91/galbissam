window.Galbissam.Models.Restaurant = Backbone.Model.extend({
	urlRoot: "/api/restaurants",

	photos: function () {
		if (!this._photos) {
			this._photos = new Galbissam.Collections.Photos({
				restaurant_id: this.id
			});
		}
		return this._photos
	},

	// menuItems: function () {
	// 	if(!this._menuItems) {
	// 		this._menuItems = new Galbissam.Collections.MenuItems({
	// 			restaurant_id: this.id
	// 		})
	// 	}
	// },

	parse: function(response) {
	    if (response.photos) {
	      this.photos().set(response.photos);
	      delete response.photos;
	    }
	    return response;
  	}
});