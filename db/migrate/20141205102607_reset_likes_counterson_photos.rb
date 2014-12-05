class ResetLikesCountersonPhotos < ActiveRecord::Migration
  def change
  	Photo.find_each() do |result|
		Photo.reset_counters(result.id, :likes)
	end
  end
end
