window.Galbissam.Views.PhotoForm = Backbone.View.extend({
	// Two Choose Image buttons rendered 
	// Upload method doesn't work
	events: {
		"submit form": "upload",
		"change input[type='filepicker']": "preview"
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
	  var url = $('input[type="filepicker"]').val()
	  var review = $form.find('input[type=text]').val()
	    var newPhoto = new Galbissam.Models.Photo();
	    newPhoto.save({ "review": review, "filepicker_url": url }, {
	      success: function () {
	        Backbone.history.navigate("", { trigger: true })
	      }
	    })
	},

	preview: function () {
		var url = $('input[type="filepicker"]').val()
		$('#upload-preview').html("<img src=" + url + ">");
	}
});