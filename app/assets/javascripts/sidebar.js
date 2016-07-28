$(document).on('click', 'input', function () {
  $('div').removeClass('active');
  $(this).addClass('active');
  var id = $(this).attr("id");
  var query = $(this).attr("query_id");
  // console.log(id);
  // console.log(query);
var myvar='';
  $.ajax({
  url: "/cars/"+id,
  method:'POST',
  data: {query_id:query},
  success: function (response) {
    console.log("hola")
    console.log(response)
    var  arrayCoordinates = []
    response.features.forEach(function(link) {
      Data(link.properties)
      link.geometry.coordinates.forEach(function(coordinate) {
        arrayCoordinates.push(coordinate);
      })
    })
    Simulation(arrayCoordinates)
      // geojsonLayer = L.geoJson(response).addTo(map);
  }
})


function Data(data){
  var myvar=data;
  var d = new Date(data.updated_at);
  var ultimoReporte = d.getDate()+"/"+d.getMonth()+" "+d.getHours().toString() + ":" + d.getMinutes().toString() + ":" + d.getSeconds().toString();
  var speed = data.speed.toString()+" Km/h";
  var sinTrafico = data.free_travel_time.toString()+" minutos";
  var conTrafico = data.rt_travel_time.toString()+" minutos";
  //console.log(d)
  //console.log(ultimoReporte)

  $("#hola").append(
  '<h3>Ultimo Reporte</h3><div class="item">' + ultimoReporte +'</div><h4>Velocidad</h3><div class="item">' + speed +'</div><h4>Viaje sin trafico</h4><div class="item">' + sinTrafico +'</div><h4>Viaje con Trafico</h3><div class="item">' + conTrafico +'</div>')

}

});
