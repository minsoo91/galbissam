window.Galbissam.Views.PhotoShow = Backbone.View.extend({
	template: JST["photos/show"],
	render: function () {
		var content = this.template({ photo: this.model });
		this.$el.html(content);

		return this;
	}
});	