L.mapbox.accessToken = 'pk.eyJ1IjoiYXJnZWwyMCIsImEiOiJjaXFyZWI5aDkwMnc4ZnBubjRldjU1Zm1lIn0.zNLRT-KVO3rsfaAquFZK3w';
var map = L.mapbox.map('map', 'mapbox.streets').setView([10.48815, -66.87653], 13);

var car = L.icon({
   iconUrl: 'assets/car.png',
   iconSize:     [25, 25],
    });


var myLines = {
    "type": "LineString",
    "coordinates": [[10.48815, -66.87653], [10.48830, -66.87670],
                    [10.48815, -66.87343], [10.48830, -66.82370]]
}

var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

var partvenezuela = [[10.48815, -66.87653]];

map.fitBounds(partvenezuela);

var marker1 = L.Marker.movingMarker(myLines.coordinates, [10000,10000,10000], { icon: car }).addTo(map);
L.polyline(myLines.coordinates).addTo(map);
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

  //
  // var coord=[]
  // $.each(params,function(index,value){
  //   coord.push('points[]'+(index+1))
  //   coord.push(value.lng+','+value.lat)
  // });
  // console.log(coord)
  // $.ajax({
  // url: '/',
  // dataType: 'json',
  // method:'POST',
  // data: {points:coord},
  // success: (data) => {
  //   settingGeojson(data)
  // }
  // });
