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
  console.log(myvar);
  $("#hola").append(
  '<h3>Ultimo Reporte</h3><div class="item"> Vehicle ID ' + myvar +'</div>')

}

});
