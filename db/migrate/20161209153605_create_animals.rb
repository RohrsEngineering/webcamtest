class CreateAnimals < ActiveRecord::Migration[5.0]
  def change
    create_table :animals do |t|
      t.string :type
      t.string :strain
      t.string :cageNumber
      t.timestamps
    end
  end
end
