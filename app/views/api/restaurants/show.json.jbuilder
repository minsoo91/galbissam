json.(@restaurant, :id, :name, :rating, :created_at, :updated_at)

json.photos (@restaurant.photos) do |photo|
	json.extract!(photo, :id, :review, :filepicker_url, :user_id, :restaurant_id, :name, :place, :created_at, :updated_at)
end
