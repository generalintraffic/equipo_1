$(document).on('click', 'input', function () {
  $('div').removeClass('active');
  $(this).addClass('active');
  var id = $(this).attr("id");
  var query = $(this).attr("query_id");
var myvar='';
var traffic='';
  $.ajax({
  url: "/cars/"+id,
  method:'POST',
  data: {query_id:query},
  success: function (response) {
    // Data(response)
    Simulation(response)
    response.features.forEach(function(link) {
      Data(link.properties)
    })
  }
})

function Data(data){
  var d = new Date(data.updated_at);
  var ultimoReporte = d.getDate()+"/"+d.getMonth()+" "+d.getHours().toString() + ":" + d.getMinutes().toString() + ":" + d.getSeconds().toString();
  var speed = data.speed.toString()+" Km/h";
  var sinTrafico = data.free_travel_time.toString()+" minutos";
  var conTrafico = data.rt_travel_time.toString()+" minutos";

  $("#hola").append(
  '<h3 class="erase">Ultimo Reporte</h3><div class="item">' + ultimoReporte +'</div><h4 class="erase">Velocidad</h3><div class="item">' + speed +'</div><h4 class="erase">Viaje sin trafico</h4 class="erase"><div class="item">' + sinTrafico +'</div><h4 class="erase">Viaje con Trafico</h3><div class="item">' + conTrafico +'</div>')
};

})
