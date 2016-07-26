class QueriesController < ApplicationController
  def index
  end

  def search
    @body = params[:data1]
    @query = Query.new
    @query.get_token
    @query.get_vehicles_in_zone #con los parametros de Argel
    @query.save
    @cars = @query.cars
    render json: @cars #son solo los id
  end
end
