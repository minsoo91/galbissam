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
	  this.doesPlaceExist(place, this.doesMenuExist);
	},

	savePhoto: function (restaurant, menuitem) {
		// get all the attributes necessary to save the photo
		var url = $('input[type="filepicker"]').val()
		var name = $form.find('#photo_name').val()
		var place = $form.find('#photo_place').val()
		var review = $form.find('#photo_review').val()
		var rating = $('#restaurant-rating').find('input[name="score"]').val()
		var restaurant = restaurant;
		var restaurant_id = restaurant.get('id');
		var menuitem = menuitem;
		var menu_item_id = menuitem.get('id');

		// create new photo 
	    var newPhoto = new Galbissam.Models.Photo({ "review": review, "filepicker_url": url, "place": place, "restaurant_id": restaurant_id, "menu_item_id": menu_item_id, "rating": rating, "name": name });
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
							globalAutoComplete.render();
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
		  	Galbissam.Collections.restaurants.create(restaurant, {
		  		success: function () {
		  			globalAutoComplete.render();
		  			return callback(that, restaurant);
		  		}
		  	})
		  } else {
		  	return callback(that, Galbissam.Collections.restaurants.where({name: place})[0])
		 }
		}
	  });
	},
	// picks up restaurant (new or fetched) from doesPlaceExist
	doesMenuExist: function (that, restaurant) {
		var name = $form.find('#photo_name').val()
		Galbissam.Collections.menuitems.fetch({
			success: function () {
				if ((Galbissam.Collections.menuitems.where({name: name})).length === 0) {
					var menuitem = new Galbissam.Models.MenuItem({ name: name });
					Galbissam.Collections.menuitems.create(menuitem, {
						success: function () {
							that.savePhoto(restaurant, menuitem)
						}
					})
				} else {
					that.savePhoto(restaurant, Galbissam.Collections.menuitems.where({name: name})[0])
				}
			}
		})
	}
});