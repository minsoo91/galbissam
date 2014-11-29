window.Galbissam.Views.PhotoShow = Backbone.View.extend({
	className: "showPhoto",
	initialize: function (options) {
		this.listenTo(this.model, "sync", this.render);
		this.user = options.user;
		this.listenToOnce(this.user, "sync", this.render);
	},

	events: {
		"dblclick img": "likePhoto"
	},

	template: JST["photos/show"],
	render: function () {
		this.user.set({ id: this.model.get("user_id") });
		if (this.model.get("user_id")) {
			this.user.fetch();
		}
		var content = this.template({ photo: this.model, user: this.user });
		this.$el.html(content);

		return this;
	},

	likePhoto: function () {
		alert("LIKED!")
	}
});