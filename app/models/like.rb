class Like < ActiveRecord::Base
	validates :photo_id, :user_id, presence: true

	belongs_to(
		:photo,
		class_name: "Photo",
		foreign_key: :photo_id,
		primary_key: :id,
		counter_cache: true
	)

	belongs_to(
		:user,
		class_name: "User",
		foreign_key: :user_id,
		primary_key: :id
	)
end