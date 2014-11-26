class Restaurant < ActiveRecord::Base
	validates :name, presence: true

	has_many(
		:photos, 
		class_name: "Photo",
		foreign_key: :restaurant_id,
		primary_key: :id
	)
end
