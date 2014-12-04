window.Galbissam.Views.PhotoShow = Backbone.CompositeView.extend({
	className: "showPhoto",
	initialize: function (options) {
		this.listenTo(this.model, "sync", this.render);
		this.user = options.user;
		this.users = options.users;
		this.likes = options.likes;
		this.listenToOnce(this.user, "sync", this.render);
		this.listenTo(this.collection, "sync", this.render);
		this.listenToOnce(this.likes, "sync", this.render);
	},

	events: {
		"dblclick img": "toggleLike",
		"dblclick #like-mark": "toggleLike",
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
		var content = this.template({ photo: this.model, user: this.user, likes: this.likes.where({ photo_id: this.model.id }), users: this.users });
		this.$el.html(content);
		this.$el.find('#photo-show').focus();
		this.$el.find('#rating').raty({score: this.model.get("rating"), readOnly: true})
		this.$el.find('#rating').append(" (Food Rating)")

		return this;
	},

	toggleLike: function (event) {
		var username = this.users.get(window.currentUser.id).get("username");
		var currentuserLike = this.likes.where({ photo_id: this.model.id,  user_id: parseInt(window.currentUser.id) })[0]
		if (!currentuserLike) {
			$('#like-mark').html("<img src='assets/glyph-heart-pop-big.png'>")
			$('#like-mark img').fadeOut(2000);
			this.likes.create({ photo_id: this.model.id, user_id: parseInt(window.currentUser.id) })
			$('#who-liked').append(username)
		} else {
			currentuserLike.destroy();
			this.likes.remove(currentuserLike);
			$('#who-liked').empty();

			this.getLikers();
			
			
			// append all the users that had liked this again.
		}

		this.$('#photo-show').focus();
	},

	getLikers: function () {
		var listOfLikers = ""
		var likes = this.likes.where({ photo_id: this.model.id })

		if (this.users.length > 0) {
			for(var i = 0; i < likes.length; i++) {
				var like = likes[i]
				if (like.get("user_id")) { 
					listOfLikers += this.users.get(like.get("user_id")).get("username") + " "
				}
			}
		}
		debugger;
		if (likes.length > 1) {
			$('#who-liked').append(likersCount + " likes")
		} else {
			$('#who-liked').append(listOfLikers)
		}
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
			this.toggleLike();
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
	},
});