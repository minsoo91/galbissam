class CreateRestaurantMenuItems < ActiveRecord::Migration
  def change
    create_table :restaurant_menu_items do |t|
      t.integer :menu_item_id, null: false
      t.integer :restaurant_id, null: false
      t.timestamps
    end
  end
end
