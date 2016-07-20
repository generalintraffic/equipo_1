class CreateQueries < ActiveRecord::Migration
  def change
    create_table :queries do |t|
      t.references :user, index: true, foreign_key: true
      t.string :token
      t.string :area
      t.string :cars
      t.string :routes

      t.timestamps null: false
    end
  end
end
