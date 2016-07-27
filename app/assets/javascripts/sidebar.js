$(document).on('click', 'input', function () {
  $('div').removeClass('active');
  $(this).addClass('active');
  var id = $(this).attr("id");
  var query = $(this).attr("query_id");
  console.log(id);
  console.log(query);


  var car = L.icon({
     iconUrl: 'assets/car.png',
     iconSize:     [25, 25],
      });



  $.ajax({
  url: "/cars/"+id,
  method:'POST',
  data: {query_id:query},
  success: function (response) {
      response.features.forEach(function(c) {
        console.log(c.geometry.coordinates);
      var marker1 = L.Marker.movingMarker(c.geometry.coordinates, [10000,10000,10000], { icon: car }).addTo(map);
      L.polyline(c.geometry.coordinates).addTo(map);
      marker1.once('click', function () {
          marker1.start();
          marker1.on('click', function() {
              if (marker1.isRunning()) {
                  marker1.pause();
              } else {
                  marker1.start();
              }
          });
          setTimeout(function() {
          }, 2000);
      });
      marker1.bindPopup('<b>Click me to start !</b>');
      marker1.openPopup();

    })
    }
  })
});
