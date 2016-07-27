class AddSelectedCarToQueries < ActiveRecord::Migration
  def change
    add_column :queries, :selected_car, :string
  end
end
