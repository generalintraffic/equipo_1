# == Schema Information
#
# Table name: queries
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  token      :string
#  area       :string
#  cars       :string
#  routes     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Query < ActiveRecord::Base
  belongs_to :user

  # Las columnas :area, :cars, :routes ahora son String-Array
  serialize :area, Array
  serialize :cars, Array
  serialize :routes, Array
end
