window.Galbissam.Models.Restaurant = Backbone.Model.extend({
	urlRoot: "/api/restaurants",

	photos: function () {
		if (!this._photos) {
			this._photos = new Galbissam.Collections.Photos({
				restaurant: this
			});
		}
		return this._photos
	},

	parse: function(response) {
	    if (response.photos) {
	      this.photos().set(response.photos);
	      delete response.photos;
	    }
	    return response;
  	}
});