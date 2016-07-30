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
    puts current_user
    if current_user != nil
      @user = current_user
      @user.queries.push(@query)
      @user.save
    end
    render json: @query  #son solo los id
  end

  def simulation_data
    @query = Query.find(params[:query_id])
    @query.get_vehicle_position(params[:id])
    @query.get_route
    @query.save
    render json: @query.routes
  end

  private

  def query_params
    params.require(:query).permit(:id, :query_id, :coordinates)
  end

end
