window.Galbissam.Views.RestaurantShow = Backbone.CompositeView.extend({
	initialize: function () {
		this.model.fetch();
		this.listenTo(this.model, "sync change", this.render),
		this.listenTo(Galbissam.Collections.photos, "add sync", this.render)
		this.listenTo(this.model.photos(), "sync change", this.render)
	},

	events: {
		"click #mapclick": "addMap"
	},

	className: "explore",
	template: JST['restaurants/show'],
	render: function () {
		var that = this;
		var content = this.template({ restaurant: this.model});
		this.$el.html(content);
		$rating = this.$el.find('#restaurant-rating');
		$rating.raty({readOnly: true, score: that.model.get("rating")});
		$rating.append(" (" + that.model._photos.length + " reviews)");
		return this;
	},

	addMap: function (event) {
		event.preventDefault();
		    var view = new Galbissam.Views.MapShow({
		    	address: this.model.get("name")
		    });
	    this.addSubview('#map-show', view);
	}
});