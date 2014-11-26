window.Galbissam.Views.PhotoForm = Backbone.View.extend({
	className: "upload-form-wrapper",
	events: {
		"submit form": "upload",
		"change input[type='filepicker']": "preview",
		// "keyup #photo_place": "googlePlaceSearch"
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
	  if (url.length === 0) {
	  	$('#upload-preview').html("<div class='alert-danger'>Please pick a file first</div>")
	  }
	  var place = $form.find('#photo_place').val()
	  var review = $form.find('#photo_review').val()
	    var newPhoto = new Galbissam.Models.Photo();
	    newPhoto.save({ "review": review, "filepicker_url": url, "place": place }, {
	      success: function () {
	        Backbone.history.navigate("", { trigger: true })
	      }
	    })
	},

	preview: function () {
		var url = $('input[type="filepicker"]').val()
		$('#upload-preview').html("<img src=" + url + ">");
		$('#upload-preview').append("<input type='text' id='photo_review' class='form-control' name='photo[review]' style='width: 400px' placeholder='Write something about your food here'>");
		$('#upload-preview').append("<input type='text' id='photo_place' class='form-control' name='photo[place]' style='width: 400px' placeholder='Where is this?'>")
		input = document.getElementById('photo_place');
		var autocomplete = new google.maps.places.Autocomplete(input);
	},

});