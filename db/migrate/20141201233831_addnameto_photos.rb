class AddnametoPhotos < ActiveRecord::Migration
  def change
  	add_column :photos, :name, :string, null: false
  end
end
