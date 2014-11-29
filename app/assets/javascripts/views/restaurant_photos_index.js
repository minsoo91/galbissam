window.Galbissam.Views.RestaurantShow = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model, "sync", this.render),
		this.listenTo(Galbissam.Collections.photos, "add sync", this.render),
		this.listenTo(this.model.photos(), "reset", this.render)
	},

	className: "explore",
	template: JST['restaurants/show'],
	render: function () {
		var that = this;
		
		var content = this.template({ restaurant: this.model});

		this.$el.html(content);
		$rating = this.$el.find('#restaurant-rating');
		debugger;
		this.model.photos().fetch({
			success: function () {
				$rating.raty({readOnly: true, score: that.model.get("rating")});
				$rating.append(" (" + that.model.photos().length + " reviews)");
			}
		})

		return this;
	}
});