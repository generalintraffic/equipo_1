$(document).on('click', 'input', function () {
  $('div').removeClass('active');
  $(this).addClass('active');
  var id = $(this).attr("id");
  var query = $(this).attr("query_id");
  // console.log(id);
  // console.log(query);
var myvar='';
var traffic='';
  $.ajax({
  url: "/cars/"+id,
  method:'POST',
  data: {query_id:query},
  success: function (response) {
    Data(response)
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

function Data(data){
  myvar = data
  L.geoJson(myvar, {
         style: function(feature) {
             var traffic = (feature.properties.rt_travel_time)/(feature.properties.free_travel_time)

          if(traffic <= 1.3){
                      return {color: "green",weight:5,opacity:1};
          }else if(traffic <=1.7){
                      return {color: "orange",weight:5,opacity:1};
          }else if(traffic > 1.7){
              return {color: "red",weight:5,opacity:1};
          }
         }
}).addTo(map);


}

});
