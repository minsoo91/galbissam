class Restaurant < ActiveRecord::Base
	validates :name, presence: true

	has_many(
		:photos, 
		class_name: "Photo",
		foreign_key: :restaurant_id,
		primary_key: :id
	)

	has_many(
		:restaurant_menu_items,
		class_name: "RestaurantMenuItem",
		foreign_key: :restaurant_id,
		primary_key: :id
	)

	has_many(
		:menu_items,
		through: :restaurant_menu_items
	)
end
