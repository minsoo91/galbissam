class AddMenuItemIdToPhotos < ActiveRecord::Migration
  def change
  	add_column :photos, :menu_item_id, :integer, null: false
  end
end
