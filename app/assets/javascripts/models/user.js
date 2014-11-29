window.Galbissam.Models.User = Backbone.Model.extend({
	urlRoot: "/users",

	photos: function () {
		if (!this._photos) {
			this._photos = new Galbissam.Collections.Photos({
				user: this
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