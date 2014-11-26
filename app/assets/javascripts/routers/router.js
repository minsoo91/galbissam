window.Galbissam.Routers.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl
	},

	routes: {
		"":"index",
		"photos/new": "newPhoto",
		"photos/:id": "showPhoto",
	},

	index: function () {
		Galbissam.Collections.photos.fetch();
		
		var indexView = new Galbissam.Views.PhotosIndex({
			collection: Galbissam.Collections.photos
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
		var photo = Galbissam.Collections.photos.getOrFetch(id);

		var showView = new Galbissam.Views.PhotoShow({
			model: photo
		});

		this._swapView(showView);
	},

	_swapView: function (view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;

		this.$rootEl.html(view.render().$el);

	}
})