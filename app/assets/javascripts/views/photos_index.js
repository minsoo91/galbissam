window.Galbissam.Views.PhotosIndex = Backbone.View.extend({
	className: "explore",
	initialize: function () {
		this.listenTo(this.collection, "add sync", this.render)
	},
	events: {
		"click .highest-rated": "getHighestRated",
		"click .most-liked": "getMostLiked"
	},

	getMostLiked: function(event) {
		event.preventDefault();
		console.log("most-liked tab!")
		sortType = "likes_count DESC"
		this.collection.fetch({data: {page: 1, sort: sortType}}, {
			success: function () {
				console.log("fetched the most liked collection")
				this.render();
			}.bind(this)
		})
	},
	getHighestRated: function(event){
		event.preventDefault();
		console.log("highest-rated tab!")
		sortType = "rating DESC"
		this.collection.fetch({data: {page: 1, sort: sortType}}, {
			success: function () {
				console.log("fetched the highest rated collection!")
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
		if (sortType === "likes_count DESC") {
			this.$('#most-liked-li').addClass('active')
			this.$('#highest-rated-li').removeClass('active')
		} else if (sortType === "rating DESC") {
			this.$('#highest-rated-li').addClass('active')
			this.$('#most-liked-li').removeClass('active')
		}
		return this;
	},

	listenForScroll: function () {
		$(window).off("scroll");
		var throttledCallback = _.throttle(this.nextPage.bind(this), 500);
		$(window).on("scroll", throttledCallback);
	},

  nextPage: function () {
    var self = this;
    if (typeof sortType === 'undefined') {
    	sortType = null
    }
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if (self.collection.page_number < self.collection.total_pages) {
      	if (!self.$('#spinner').hasClass("sk-spinner sk-spinner-rotating-plane")) {
			self.$('#spinner').addClass("sk-spinner sk-spinner-rotating-plane")
		}
        self.collection.fetch({
          data: { page: self.collection.page_number + 1, sort: sortType },
          remove: false,
          wait: true,
          success: function () {
          	self.$el.find('#spinner').removeClass("sk-spinner sk-spinner-rotating-plane")
          }
        });
      } else {
      	self.$el.find('#spinner').removeClass("sk-spinner sk-spinner-rotating-plane")
      }
    }
  },
});