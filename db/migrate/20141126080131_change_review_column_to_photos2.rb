class ChangeReviewColumnToPhotos2 < ActiveRecord::Migration
  def change
  	 change_column :photos, :review, :string, null: true
  end
end
