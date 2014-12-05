window.Galbissam.Views.PhotosIndex = Backbone.View.extend({
	className: "explore",
	initialize: function () {
		this.listenTo(this.collection, "add", this.render)
	},
	events: {
		"click .highest-rated": "getHighestRated",
		"click .most-liked": "getMostLiked"
	},

	getMostLiked: function(event) {
		event.preventDefault();
		this.collection.fetch({data: {sort: "likes_count DESC"}}, {
			success: function () {
				this.render();
			}.bind(this)
		})
	},
	getHighestRated: function(event){
		event.preventDefault();
		//fetch the collection with a query string
		this.collection.fetch({data: {sort: "rating DESC"}}, {
			success: function () {
				this.render();
			}.bind(this)
		})
	},

	template: JST['photos/index'],

	render: function () {
		var content = this.template({ 
			photos: this.collection
		});
		this.$el.html(content);
		if (!$('img').hasClass('faded')) {
			this.$('img').hide().fadeIn(2000, function () {
				$('img').addClass('faded')
			})
		}
		this.listenForScroll();
		return this;
	},

	listenForScroll: function () {
		$(window).off("scroll");
		var throttledCallback = _.throttle(this.nextPage.bind(this), 500);
		$(window).on("scroll", throttledCallback);
	},

  nextPage: function () {
    var self = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if (self.collection.page_number < self.collection.total_pages) {
      	if (!self.$('#spinner').hasClass("sk-spinner sk-spinner-rotating-plane")) {
			self.$('#spinner').addClass("sk-spinner sk-spinner-rotating-plane")
		}
        self.collection.fetch({
          data: { page: self.collection.page_number + 1 },
          remove: false,
          wait: true,
          success: function () {
          	self.$el.find('#spinner').removeClass("sk-spinner sk-spinner-rotating-plane")
          }
        });
      }
    }
  },
});