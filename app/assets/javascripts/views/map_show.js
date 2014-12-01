window.Galbissam.Views.MapShow = Backbone.View.extend({
	className: "mapView",
	initialize: function (options) {
		this.address = options.address
	},
	template: JST['maps/show'],
	render: function () {
		var content = this.template({
			address: this.address
		});
		this.$el.html(content);
		return this;
	}
})
