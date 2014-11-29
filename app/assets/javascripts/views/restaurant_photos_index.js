window.Galbissam.Views.RestaurantShow = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model, "sync", this.render),
		this.listenTo(Galbissam.Collections.photos, "add sync", this.render),
		this.listenTo(this.model.photos(), "reset", this.render)
	},

	className: "explore",
	template: JST['restaurants/show'],
	render: function () {
		this.model.photos().fetch();
		var content = this.template({ restaurant: this.model});
		
		

		this.$el.html(content);
		$rating = this.$el.find('#restaurant-rating');
		$rating.raty({readOnly: true, score: 5});
		return this;
	}
});