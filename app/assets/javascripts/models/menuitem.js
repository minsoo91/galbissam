window.Galbissam.Models.MenuItem = Backbone.Model.extend({
	urlRoot: "api/menuitems",

	photos: function () {
		if (!this._photos) {
			this._photos = new Galbissam.Collections.Photos({
				menu_id: this.id
			});
		}
		return this._photos
	},

	parse: function (response) {
		if (response.photos) {
	      this.photos().set(response.photos);
	      delete response.photos;
	    }
	    return response;
	}
})