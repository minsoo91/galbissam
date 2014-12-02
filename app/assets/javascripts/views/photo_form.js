window.Galbissam.Views.PhotoForm = Backbone.View.extend({
	className: "upload-form-wrapper",
	events: {
		"submit form": "upload",
		"change input[type='filepicker']": "preview",
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
	  var place = $form.find('#photo_place').val()
	  var url = $('input[type="filepicker"]').val()
	  if (url.length === 0) {
	  	$('#upload-preview').html("<div class='alert-danger'>Please pick a file first</div>")
	  }	
	  var restaurant = this.doesPlaceExist(place, this.savePhoto);
	},

	savePhoto: function (restaurant) {
		var url = $('input[type="filepicker"]').val()
		var name = $form.find('#photo_name').val()
		var place = $form.find('#photo_place').val()
		var review = $form.find('#photo_review').val()
		var rating = $('#restaurant-rating').find('input[name="score"]').val()
		var restaurant = restaurant;
		var restaurant_id = restaurant.get('id');

	    var newPhoto = new Galbissam.Models.Photo({ "review": review, "filepicker_url": url, "place": place, "restaurant_id": restaurant_id , "rating": rating, "name": name });
	    Galbissam.Collections.photos.create(newPhoto, {
	      success: function () {
	      	restaurant.photos().fetch({
	      		success: function () {
	      			restaurant._photos = new Galbissam.Collections.Photos(restaurant.photos().where({restaurant_id: restaurant.id}))
	      			restaurant.photos();
	      			var result = 0;
					for (var i = 0; i < restaurant.photos().length; i++) {
						var photoRating = restaurant.photos().models[i].get("rating")
						result += photoRating
					}
					restaurant.set("rating", result / restaurant.photos().length);
					
					restaurant.save({}, {
						success: function () {
							Backbone.history.navigate("", { trigger: true })
						}
					});
					
	      		}
	      	});
	      }
	    })
	},

	preview: function () {
		var url = $('input[type="filepicker"]').val()
		$('#upload-preview').html("<img src=" + url + ">");
		$('#upload-preview').append("<input type='text' id='photo_name' class='form-control' name='photo[name]' style='width: 400px' placeholder='What is this food called?'>")
		$('#upload-preview').append("<input type='text' id='photo_review' class='form-control' name='photo[review]' style='width: 400px' placeholder='Write something about your food here'>");
		$('#upload-preview').append("<input type='text' id='photo_place' class='form-control' name='photo[place]' style='width: 400px' placeholder='Where is this?'>")
		$('#restaurant-rating').text("Rate your experience! ")
		$('#restaurant-rating').raty()
		input = document.getElementById('photo_place');
		var autocomplete = new google.maps.places.Autocomplete(input);
	},

	doesPlaceExist: function (place, callback) {
	  var that = this;
	  Galbissam.Collections.restaurants.fetch({
	  	success: function () {
		  if ((Galbissam.Collections.restaurants.where({name: place})).length === 0) {
		  	var restaurant = new Galbissam.Models.Restaurant({ name: place });
		  	restaurant.save({},{
		  		success: function () {
		  			Galbissam.Collections.restaurants.add(restaurant)
		  			return callback(restaurant);
		  		}
		  	})
		  } else {
		  	return callback(Galbissam.Collections.restaurants.where({name: place})[0])
		 }
		}
	  });
	}
});