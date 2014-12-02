class MenuItem < ActiveRecord::Base
	validates :name, presence: true

	has_many(
		:restaurants,
		through: :restaurant_menu_items
	)
	
	has_many(
		:restaurant_menu_items,
		class_name: "RestaurantMenuItem",
		foreign_key: :menu_item_id,
		primary_key: :id
	)

	has_many(
		:photos,
		class_name: "Photo",
		foreign_key: :menu_item_id,
		primary_key: :id
	)
end
