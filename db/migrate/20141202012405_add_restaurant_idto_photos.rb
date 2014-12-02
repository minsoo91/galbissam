class AddRestaurantIdtoPhotos < ActiveRecord::Migration
  def change
  	add_column :photos, :restaurant_id, :integer, null: false
  end
end
