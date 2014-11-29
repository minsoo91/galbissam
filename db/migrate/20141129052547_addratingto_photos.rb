class AddratingtoPhotos < ActiveRecord::Migration
  def change
  	add_column :photos, :rating, :integer, null: false
  end
end
