window.Galbissam.Views.RestaurantShow = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model, "sync change", this.render),
		this.listenTo(Galbissam.Collections.photos, "add sync", this.render)
		this.listenTo(this.model.photos(), "sync change", this.render)
	},

	className: "explore",
	template: JST['restaurants/show'],
	render: function () {
		var that = this;
		var content = this.template({ restaurant: this.model});
		console.log("rendered")
		this.$el.html(content);
		$rating = this.$el.find('#restaurant-rating');
		$rating.raty({readOnly: true, score: that.model.get("rating")});
		$rating.append(" (" + that.model._photos.length + " reviews)");
		return this;
	}
});