window.Galbissam.Collections.UserPhotos = Backbone.Collection.extend({
	initialize: function (options) {
		this.user = options.user
	},

	model: Galbissam.Models.Photo,
	
	url: function () {
		return this.user.url() + "/photos"
	}
});