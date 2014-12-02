class RemoveRestaurantIdToPhotos < ActiveRecord::Migration
  def change
  	remove_column :photos, :restaurant_id
  end
end
