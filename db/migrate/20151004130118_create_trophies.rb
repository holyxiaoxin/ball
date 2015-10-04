class CreateTrophies < ActiveRecord::Migration
  def change
    create_table :trophies do |t|
      t.string :src
      t.string :alt
      t.text :description
      t.timestamps null: false
    end
  end
end
