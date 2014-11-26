window.Galbissam.Collections.Photos = Backbone.Collection.extend({
	model: Galbissam.Models.Photo,
	url: "api/photos",

	getOrFetch: function (id) {
		var photos = this;
		var photo = photos.get(id);
		if (!photo) {
			photo = new Galbissam.Models.Photo({ id: id});
			photo.fetch();
		}

		return photo;
	}
})

Galbissam.Collections.photos = new Galbissam.Collections.Photos();