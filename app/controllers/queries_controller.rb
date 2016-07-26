class QueriesController < ApplicationController
  def index
  end

  def show
    @query = Query.last
    render json: @query
  end

  def search
    @coordinates_string = params[:coordinates]
    @coordinates = JSON.parse(@coordinates_string)
    @query = Query.new
    @query.get_token
    @query.area = @coordinates
    @query.get_vehicles_in_zone #con los parametros de Argel
    @query.save
    @cars = @query.cars
    render json: @cars #son solo los id
  end
end
