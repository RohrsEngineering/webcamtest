class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags do |t|
      t.string :data
      t.string :number
      t.timestamps null:false
    end
  end
end
