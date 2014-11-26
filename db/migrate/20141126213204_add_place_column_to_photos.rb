class AddPlaceColumnToPhotos < ActiveRecord::Migration
  def change
  	add_column :photos, :place, :string
  end
end
