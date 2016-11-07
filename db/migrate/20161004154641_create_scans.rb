class CreateScans < ActiveRecord::Migration
  def change
    create_table :scans do |t|
      t.string :data
      t.string :number
      t.timestamps null: false
    end
  end
end
