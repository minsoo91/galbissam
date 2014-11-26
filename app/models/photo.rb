class Photo < ActiveRecord::Base
	validates :filepicker_url, :user_id, presence: true
	belongs_to(
		:user,
		class_name: "User",
		foreign_key: :user_id,
		primary_key: :id
	)
end
