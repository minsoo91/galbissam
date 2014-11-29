class Photo < ActiveRecord::Base
	validates :filepicker_url, :user_id, :restaurant_id, :place, :rating, presence: true
	belongs_to(
		:user,
		class_name: "User",
		foreign_key: :user_id,
		primary_key: :id
	)
end
