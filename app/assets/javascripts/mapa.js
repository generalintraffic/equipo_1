L.mapbox.accessToken = 'pk.eyJ1IjoiYXJnZWwyMCIsImEiOiJjaXFyZWI5aDkwMnc4ZnBubjRldjU1Zm1lIn0.zNLRT-KVO3rsfaAquFZK3w';
var map = L.mapbox.map('map', 'mapbox.streets').setView([10.48815, -66.87653], 13);

var car = L.icon({
   iconUrl: 'assets/car.png',
   iconSize:     [25, 25],
    });

var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

var partvenezuela = [[10.48815, -66.87653]];

map.fitBounds(partvenezuela);


function Simulation(data){
  var  arrayCoordinates = []
  data.features.forEach(function(link) {
      link.geometry.lat_long.forEach(function(coordinate) {
      arrayCoordinates.push(coordinate);
    })
    })
    myvar = data;
    var myStyle = function(feature) {
        var traffic = (feature.properties.rt_travel_time)/(feature.properties.free_travel_time)
        time = feature.properties.rt_travel_time
        miliseconds = feature.properties.speed_miliseconds
        console.log(miliseconds);
     if(traffic <= 1.3){
                 return {color: "green",weight:5,opacity:1};
     }else if(traffic <=1.7){
                 return {color: "orange",weight:5,opacity:1};
     }else if(traffic > 1.7){
         return {color: "red",weight:5,opacity:1};
     }
    }
    L.geoJson(myvar, {
            style: myStyle
       }).addTo(map);
// -----ANIMACION FLUIDA PERO APARECE EN LA ANTARTIDA----------------------

       var marker2 = L.Marker.movingMarker(arrayCoordinates,
           miliseconds, {autostart: true,icon: car}).addTo(map);

// -----ANIMACION NO FLUIDA PERO APARECE BIEN EN LA RUTA  comentar self.fixing_routes en el model----------------------
  // var j = 0;
  //
  // var marker = L.marker([0, 0], {
  //   icon:car
  // }).addTo(map);
  //
  // function tick() {
  //     marker.setLatLng(L.latLng(
  //         arrayCoordinates[j][1],
  //         arrayCoordinates[j][0]));
  //
  //     if (++j < arrayCoordinates.length) setTimeout(tick, 1000);
  // }
  //
  // tick();
  marker2.on('end', function() {
      marker2.bindPopup('<b>Time '+time+ ' minutos!</b>', {closeOnClick: false})
      marker2.openPopup();

  });


}
$('#clear').on('click', function(){

  location.reload()
});
