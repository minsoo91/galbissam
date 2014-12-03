window.Galbissam.Views.MenuItemShow = Backbone.CompositeView.extend({
	initialize: function () {
		this.model.fetch();
		this.listenTo(this.model, "sync change", this.render),
		this.listenTo(Galbissam.Collections.photos, "add sync", this.render)
		this.listenTo(this.model.photos(), "sync change", this.render)
	},

	template: JST['menuitems/show'],

	render: function () {
		var content = this.template({menuitem: this.model})
		this.$el.html(content)

		return this;
	}
})