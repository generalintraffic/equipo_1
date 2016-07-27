class QueriesController < ApplicationController
  def index
  end

  #Este método es provisional, solo para pruebas.

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
    @query.get_vehicles_in_zone
    @query.save
    @cars = @query.cars
    render json: @cars #son solo los id
  end

  # ¿Verificar con Argel paso de Id por params? ¿Post or get?

  def simulation_data
    @query = Query.find(params[:query_id])
    @query.get_vehicle_position(params[:car_id])
    @query.get_route
    @query.save
    render json: @query.routes
  end

end
