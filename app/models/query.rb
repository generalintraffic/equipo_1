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
#  positions  :string
#

class Query < ActiveRecord::Base
  belongs_to :user

  # Las columnas :area, :cars, :positions,:routes ahora son String-Array
  serialize :area, Array
  serialize :cars, Array
  serialize :positions, Array
  serialize :routes, Array

  # Lógica para connsumir Api InTraffic
  # require 'uri'
  # require 'net/http'
  # cars_string = ''
  # cars_string = cars_string[0..cars_string.length-2]

  def get_token
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
    self.save
    puts response
    return @token
  end

  def get_vehicles_in_zone #entrada dos esquinas del bbox (self.area)
    url = URI('https://api.intraffic.com.ve/vehicles/get_vehicles_in_zone.json?bbox_corner_1=-66.85607671737671,10.5022243393289794&bbox_corner_2=-66.844961643219,10.495154314023422')
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
    self.save
    puts response
    return self
  end

  def get_vehicle_position #entrada varios vehicles_id (self.cars)
    url_base = 'https://api.intraffic.com.ve/vehicles/get_vehicle_position.json'
    self.cars.each do |car|
      url = URI(url_base +'?vehicle_id='+ car) 
      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      request = Net::HTTP::Get.new(url)
      request["user-agent"] = "develop"
      request["authorization"] = "Bearer " + self.token
      request["cache-control"] = "no-cache"
      http_response = http.request(request)
      response = eval(http_response.read_body)
      self.positions.push(response)
      puts response
    end
    self.save
    return self
  end

  #Este metodo no esta completo

  def get_vehicle_route #Entrada dos puntos extremos de la ruta (dos posiciones) (self.positions)
    url = URI("https://api.intraffic.com.ve/routing.json?points[]=-66.9067352,10.5047266&points[]=-66.9077437,10.5074273")
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Get.new(url)
    request["user-agent"] = "develop"
    request["authorization"] = "Bearer " + self.token
    request["cache-control"] = "no-cache"
    response = http.request(request)
    puts response.read_body
  end

end