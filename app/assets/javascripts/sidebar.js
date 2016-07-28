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
      link.geometry.coordinates.forEach(function(coordinate) {
        arrayCoordinates.push(coordinate);
      })
    })
    Simulation(arrayCoordinates)
      // geojsonLayer = L.geoJson(response).addTo(map);
  }
})
});
