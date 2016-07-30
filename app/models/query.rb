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

#lo logramos!

class Query < ActiveRecord::Base
  belongs_to :user

  # Las columnas :area, :cars, :positions ahora son String-Array
  serialize :area, Array
  serialize :cars, Array
  serialize :positions, Array
  serialize :routes #routes es un hash

  # Lógica para connsumir Api InTraffic

  def get_token
    if self.class.last != nil
      if self.class.last.token_time != nil
        @last_query = self.class.last
        @last_token_time = @last_query.token_time
        @now_time = (Time.current.in_time_zone('Caracas'))
        @elapsed_seconds = @now_time - @last_token_time
        if @elapsed_seconds <= 1600
          self.get_previous_token
        else
          self.get_new_token
        end
      else
        self.get_new_token
      end
    else
      self.get_new_token
    end
  end

  def get_previous_token
    self.token = self.class.last.token
    self.token_time = self.class.last.token_time
  end

  def get_new_token
    url = URI('https://api.intraffic.com.ve/oauth2/token')
    https = Net::HTTP.new(url.host,url.port)
    https.use_ssl = true
    https.verify_mode = OpenSSL::SSL::VERIFY_NONE
    client_secret = 'YWNhZGVtaWFoYWNrOjQzNTFkNDBmMzAzMGFhZDIyMDdmZTU3MTUyMjk4MTFiNzFjN2Y2ZWU='
    data =  {
              "grant_type" => "client_credentials",
              "dataType" => "json",
              "contentType" => "application/json"
            }
    req = https.post(url.path, data.to_json, {
      'User-Agent' => 'develop',
      'Content-Type' => 'application/json',
      'Content-Length' => '29',
      'Authorization' => "Basic " + client_secret
      })
    response = eval(req.read_body)
    @token = response[:access_token]
    self.token = @token
    self.token_time = DateTime.now
    puts response
    return @token
  end

  def check_token
    @now_time = (Time.current.in_time_zone('Caracas'))
    @elapsed_seconds = @now_time - self.token_time
    if @elapsed_seconds >= 1600
      self.get_new_token
    end
  end

  def get_vehicles_in_zone
    self.check_token
    long1 = self.area[0]["lng"].to_s
    lat1 = self.area[0]["lat"].to_s
    long2 = self.area[1]["lng"].to_s
    lat2 = self.area[1]["lat"].to_s
    url = URI('https://api.intraffic.com.ve/vehicles/get_vehicles_in_zone.json?bbox_corner_1='+long1+','+lat1+'&bbox_corner_2='+long2+','+lat2)
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Get.new(url)
    request["user-agent"] = "develop"
    request["authorization"] = "Bearer " + self.token
    request["cache-control"] = "no-cache"
    http_response = http.request(request)
    response = eval(http_response.read_body)
    self.cars = response
    return self
  end

  def get_vehicle_position(vehicle_id) 
    self.check_token
    self.selected_car = vehicle_id
    url = URI('https://api.intraffic.com.ve/vehicles/get_vehicle_position.json/?vehicle_id=' + vehicle_id) 
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Get.new(url)
    request["user-agent"] = "develop"
    request["authorization"] = "Bearer " + self.token
    request["content-type"] = "application/x-www-form-urlencoded;charset=UTF-8"
    request["cache-control"] = "no-cache"
    http_response = http.request(request)
    response = eval(http_response.read_body)
    self.positions = response
    puts response
    return self
  end

  def get_route
    self.check_token
    url_base = 'https://api.intraffic.com.ve/routing.geojson?'
    url_query = ''
    # array_coordinates = []
    self.positions[0][:lon_lat].each do |coordinate|
      array_string = []
      array_string = coordinate.split(',')
      url_query += 'points[]=' + array_string[1]+','+array_string[0] + '&'
      # array_coordinates.push(array_string[1])
      # array_coordinates.push(array_string[0])
    end
    #self.positions[0][:coordinates] = array_coordinates
    url_query = url_query[0..url_query.length-2]
    self.positions[0][:query_to_do] = url_query
    url = URI(url_base+url_query)
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Get.new(url)
    request["user-agent"] = "develop"
    request["authorization"] = "Bearer " + self.token
    request["cache-control"] = "no-cache"
    http_response = http.request(request)
    puts http_response.read_body
    response_string = http_response.read_body
    response = JSON.parse(response_string)
    self.routes = response
    self.fixing_routes
    self.adding_miliseconds
    return self
  end

  #metodo para agregar a cada link un array de coordenadas en formato lat-long 

  def fixing_routes
    @routes = self.routes
    @routes["features"].each do |link|
      link["geometry"]["lat-long"]=[]
      link["geometry"]["coordinates"].each do |coordinate|
        aux_array = []
        aux_array[0] = coordinate[1]
        aux_array[1] = coordinate[0]
        link["geometry"]["lat-long"].push(aux_array)
      end
    end
  end

  #metodo para agregar a cada link["properties"] un tiempo de trayecto en miliseconds

  def adding_miliseconds
    @route = self.routes
    @routes["features"].each do |link|
      link["properties"]["speed_miliseconds"] = link["properties"]["rt_travel_time"]*1000
    end 
  end

end

  #get Varios vehiculos

  # def get_vehicles_position #Siempre obtiene las mismas coordenadas
  #   url_base = 'https://api.intraffic.com.ve/vehicles/get_vehicle_position.json/?vehicle_id='
  #   self.cars.each do |car|
  #     url = URI(url_base + car) 
  #     http = Net::HTTP.new(url.host, url.port)
  #     http.use_ssl = true
  #     http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  #     request = Net::HTTP::Get.new(url)
  #     request["user-agent"] = "develop"
  #     request["authorization"] = "Bearer " + self.token
  #     request["content-type"] = "application/x-www-form-urlencoded;charset=UTF-8"
  #     request["cache-control"] = "no-cache"
  #     http_response = http.request(request)
  #     response = eval(http_response.read_body)
  #     self.positions.push(response)
  #     puts response
  #   end
  #   return self
  # end

  #Metodo viejo de Routes

  # def get_route_2 #Este es el metodo truqueado
  #   self.check_token
  #   long1 = self.area[0]["lng"].to_s
  #   lat1 = self.area[0]["lat"].to_s
  #   long2 = self.area[1]["lng"].to_s
  #   lat2 = self.area[1]["lat"].to_s
  #   url = URI('https://api.intraffic.com.ve/routing.geojson?points[]='+long1+','+lat1+'&points[]='+long2+','+lat2)
  #   http = Net::HTTP.new(url.host, url.port)
  #   http.use_ssl = true
  #   http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  #   request = Net::HTTP::Get.new(url)
  #   request["user-agent"] = "develop"
  #   request["authorization"] = "Bearer " + self.token
  #   request["cache-control"] = "no-cache"
  #   http_response = http.request(request)
  #   puts http_response.read_body
  #   response_string = http_response.read_body
  #   response = JSON.parse(response_string)
  #   self.routes = response
  #   self.fixing_routes
  #   self.adding_miliseconds
  #   return self
  # end