class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer :user_id, null: false
      t.string :review, null: false
      t.string :filepicker_url, null: false
      t.timestamps
    end
  end
end
