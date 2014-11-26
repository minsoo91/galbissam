window.Galbissam.Views.PhotoShow = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model, "sync", this.render)
	},

	events: {
		"dblclick img": "likePhoto"
	},

	template: JST["photos/show"],
	render: function () {
		var content = this.template({ photo: this.model });
		this.$el.html(content);

		return this;
	},

	likePhoto: function () {
		alert("LIKED!")
	}
});	