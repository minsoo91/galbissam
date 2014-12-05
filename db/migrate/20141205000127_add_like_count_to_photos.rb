class AddLikeCountToPhotos < ActiveRecord::Migration
  def change
  	add_column :photos, :likes_count, :integer, default: 0, null: false

  	Photo.find_each() do |result|
  		Photo.reset_counters(result.id, :likes)
  	end
  end
end
