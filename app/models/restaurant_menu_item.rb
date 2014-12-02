class RestaurantMenuItem < ActiveRecord::Base
	validates :restaurand_id, :menu_item_id, presence: true
	belongs_to(
		:restaurant,
		class_name: "Restaurant",
		foreign_key: :restaurant_id,
		primary_key: :id
	)

	belongs_to(
		:menu_item,
		class_name: "MenuItem",
		foreign_key: :menu_item_id,
		primary_key: :id
	)
end
