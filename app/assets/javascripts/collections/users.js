window.Galbissam.Collections.Users = Backbone.Collection.extend({
	model: Galbissam.Models.User,
	url: "/users",

	getOrFetch: function (id) {
		var users = this;
		var user = users.get(id);
		if (!user) {
			user = new Galbissam.Models.User({ id: id});
			user.fetch();
		}

		return user;
	}
})

Galbissam.Collections.users = new Galbissam.Collections.Users();