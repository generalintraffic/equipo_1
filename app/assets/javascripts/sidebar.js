$(document).on('click', 'input', function () {
  $(".erase").remove()
  $(".item2").remove()
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
    Data(response.features[0].properties)

  }
})

function Data(data){
  var d = new Date(data.updated_at);
  var ultimoReporte = d.getDate()+"/"+d.getMonth()+" "+d.getHours().toString() + ":" + d.getMinutes().toString() + ":" + d.getSeconds().toString();

  $("#hola").append(
  '<h3 class="erase">Ultimo Reporte</h3><div class="item2">' + ultimoReporte +'</div>')
};

})
