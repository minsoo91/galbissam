window.Galbissam.Views.PhotoForm = Backbone.View.extend({
	// Two Choose Image buttons rendered 
	// Upload method doesn't work
	events: {
		"submit form": "upload"
	},
	template: JST['photos/form'],
	render: function () {
		var content = this.template({ photo: this.model });
		this.$el.html(content);
		return this;
	},

	upload: function (event) {
	  event.preventDefault();
	  $form = $(event.currentTarget)
	  var review = $form.find('input[type=text]').val()
	  filepicker.pick(function(blob) {
	    var newPhoto = new Galbissam.Models.Photo({
	      filepicker_url: blob.url,
	    });
	    newPhoto.set("review", review);
	    newPhoto.save({}, {
	      success: function () {
	        alert('Photo saved!');
	      }
	    })
	  });
	}
});