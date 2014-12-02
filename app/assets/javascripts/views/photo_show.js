window.Galbissam.Views.PhotoShow = Backbone.CompositeView.extend({
	className: "showPhoto",
	initialize: function (options) {
		this.listenTo(this.model, "sync", this.render);
		this.user = options.user;
		this.listenToOnce(this.user, "sync", this.render);
		this.listenTo(this.collection, "sync", this.render);
	},

	events: {
		"dblclick img": "likePhoto",
		"click #mapclick": "addMap",
		"keydown #photo-show": "keyAction",
		"click #random": "randomPhoto",
		"click #previous": "previousPhoto",
		"click #next": "nextPhoto"
	},

	template: JST["photos/show"],

	render: function () {
		this.user.set({ id: this.model.get("user_id") });
		if (this.model.get("user_id")) {
			this.user.fetch();
		}
		var content = this.template({ photo: this.model, user: this.user });
		this.$el.html(content);
		this.$el.find('#photo-show').focus();
		this.$el.find('#rating').raty({score: this.model.get("rating"), readOnly: true})
		this.$el.find('#rating').append(" (Food Rating)")
		return this;
	},

	likePhoto: function (event) {
		alert("LIKED!")
	},

	addMap: function (event) {
		event.preventDefault();
		this.$el.find('#map-show').empty();
		    var view = new Galbissam.Views.MapShow({
		    	address: this.model.get("place")
		    });
	    this.addSubview('#map-show', view);
	},

	keyAction: function (event) {
		var code = event.keyCode
		if (code == 37 || code == 80) {
			this.previousPhoto();
		} else if (code == 39 || code == 78) {
			this.nextPhoto();
		} else if (code == 82) {
			this.randomPhoto();
		} else if (code == 76) {
			this.likePhoto();
		}
	},
	previousPhoto: function (event) {
		if (event) {
			event.preventDefault();
		}
		current_id = this.model.id;
		if (current_id !== 1) {
			Backbone.history.navigate("#/photos/" + (current_id - 1) + "", { trigger: true} )
		}
	},

	nextPhoto: function (event) {
		if (event) {
			event.preventDefault();
		}
		current_id = this.model.id;
		if (current_id !== this.collection.length) {
			Backbone.history.navigate("#/photos/" + (current_id + 1) + "", { trigger: true} )
		}
	},

	randomPhoto: function (event) {
		if (event) {
			event.preventDefault();
		}
		Backbone.history.navigate("#/photos/" + (Math.floor(Math.random() * this.collection.length) + 1) + "", { trigger: true} )
	}
});