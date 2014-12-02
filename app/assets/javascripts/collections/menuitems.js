window.Galbissam.Collections.MenuItems = Backbone.Collection.extend({
	model: Galbissam.Models.MenuItem,
	url: "api/menuitems"
});

Galbissam.Collections.menuitems = new Galbissam.Collections.MenuItems();