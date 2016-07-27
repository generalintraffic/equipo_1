# == Schema Information
#
# Table name: queries
#
#  id           :integer          not null, primary key
#  user_id      :integer
#  token        :string
#  area         :string
#  cars         :string
#  routes       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  positions    :string
#  token_time   :datetime
#  selected_car :string
#

require 'test_helper'

class QueryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
