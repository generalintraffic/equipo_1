class AddPositionToQuery < ActiveRecord::Migration
  def change
    add_column :queries, :positions, :string
  end
end
