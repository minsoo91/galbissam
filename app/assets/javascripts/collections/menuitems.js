window.Galbissam.Collections.MenuItems = Backbone.Collection.extend({
	model: Galbissam.Models.MenuItem,
	url: "api/menuitems",

	getOrFetch: function (id) {
		var menuItems = this;
		var menuItem = menuItems.get(id);
		if (!menuItem) {
			menuItem = new Galbissam.Models.MenuItem({ id: id});
			menuItem.fetch();
		}

		return menuItem;
	}
});

Galbissam.Collections.menuitems = new Galbissam.Collections.MenuItems();