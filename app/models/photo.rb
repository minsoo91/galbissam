class Photo < ActiveRecord::Base
	validates :filepicker_url, :user_id, :name, :restaurant_id, :menu_item_id, :place, :rating, presence: true
	
	belongs_to(
		:user,
		class_name: "User",
		foreign_key: :user_id,
		primary_key: :id
	)

	belongs_to(
		:menu_item,
		class_name: "MenuItem",
		foreign_key: :menu_item_id,
		primary_key: :id
	)

	belongs_to(
		:restaurant,
		class_name: "Restaurant",
		foreign_key: :restaurant_id,
		primary_key: :id
	)

	has_many(
		:likes,
		class_name: "Like",
		foreign_key: :photo_id,
		primary_key: :id
	)
end
