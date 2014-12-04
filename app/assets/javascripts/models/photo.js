window.Galbissam.Models.Photo = Backbone.Model.extend({
	urlRoot: "api/photos",

	likes: function () {
		if (!this._likes) {
			this._likes = new Galbissam.Collections.Likes({
				photo_id: this.id
			});
		}
		return this._likes
	},

	parse: function(response) {
	    if (response.likes) {
	      this.likes().set(response.likes);
	      delete response.likes;
	    }
	    return response;
  	}
})