window.Galbissam.Views.PhotosIndex = Backbone.View.extend({
	className: "explore",
	initialize: function () {
		this.listenTo(this.collection, "sync", this.render)
	},
	template: JST['photos/index'],
	render: function () {
		var content = this.template({ photos: this.collection});
		this.$el.html(content);
		return this;
	}
});