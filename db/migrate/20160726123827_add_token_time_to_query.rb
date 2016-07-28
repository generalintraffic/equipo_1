class AddTokenTimeToQuery < ActiveRecord::Migration
  def change
    add_column :queries, :token_time, :datetime
  end
end
