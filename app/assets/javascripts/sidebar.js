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
       Data(c.properties);
      Simulation(c.geometry);
    })


        // geojsonLayer = L.geoJson(response).addTo(map);
    }
  })
  function Data(data){
    var myvar=data;
    console.log(myvar);

  }
});
