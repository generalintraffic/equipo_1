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

      response.features.forEach(function(c) {
      Simulation(c.geometry);
    })


        // geojsonLayer = L.geoJson(response).addTo(map);
    }
  })
});

function Simulation(data){
    myvar = data;
    // console.log(myvar);

      geojsonLayer = L.geoJson(myvar);

     var marker2 = L.Marker.movingMarker(myvar.coordinates,
         [3000, 9000, 9000, 4000], {autostart: true,icon: car}).addTo(map);
     L.polyline(myvar.coordinates, {color: 'red'}).addTo(map);


};
