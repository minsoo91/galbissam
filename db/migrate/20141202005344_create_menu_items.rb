class CreateMenuItems < ActiveRecord::Migration
  def change
    create_table :menu_items do |t|
      t.string :name, null: false
      t.integer :price
      t.integer :restaurant_id, null: false
      t.timestamps
    end
  end
end
