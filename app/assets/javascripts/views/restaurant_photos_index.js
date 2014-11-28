window.Galbissam.Views.RestaurantShow = Backbone.View.extend({
	className: "explore",
	initialize: function () {
		this.listenTo(this.model, "sync", this.render)
	},
	template: JST['restaurants/show'],
	render: function () {
		var content = this.template({ restaurant: this.model});
		this.$el.html(content);
		return this;
	}
});