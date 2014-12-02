class RemoveRestaurantIdtoMenuItems < ActiveRecord::Migration
  def change
  	remove_column :menu_items, :restaurant_id
  end
end
