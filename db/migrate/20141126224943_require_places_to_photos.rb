class RequirePlacesToPhotos < ActiveRecord::Migration
  def change
  	change_column :photos, :place, :string, null: false
  end
end
