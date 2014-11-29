window.Galbissam.Views.UserShow = Backbone.View.extend({
	className: "explore",
	initialize: function () {
		this.listenTo(this.model, "sync", this.render)
	},
	template: JST['users/show'],
	render: function () {
		var content = this.template({ user: this.model});
		this.$el.html(content);
		return this;
	}
});