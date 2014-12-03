window.Galbissam.Views.PhotosIndex = Backbone.View.extend({
	className: "explore",
	initialize: function () {
		this.listenTo(this.collection, "add", this.render)
	},

	template: JST['photos/index'],

	render: function () {
		var content = this.template({ 
			photos: this.collection
		});
		this.$el.html(content);
		this.listenForScroll();
		// this.$el.find('#spinner').addClass("sk-spinner sk-spinner-rotating-plane")
		return this;
	},

	listenForScroll: function () {
		$(window).off("scroll");
		var throttledCallback = _.throttle(this.nextPage.bind(this), 2500);
		this.$el.find('#spinner').addClass("sk-spinner sk-spinner-rotating-plane")
		$(window).on("scroll", throttledCallback);
	},

  nextPage: function () {
    var self = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      console.log("scrolled to bottom!");
      if (self.collection.page_number < self.collection.total_pages) {
        self.collection.fetch({
          data: { page: self.collection.page_number + 1 },
          remove: false,
          wait: true,
          success: function () {
          	self.$el.find('#spinner').removeClass("sk-spinner sk-spinner-rotating-plane")
            console.log("successfully fetched page " + self.collection.page_number);
          }
        });
      }
    }
  },
});