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
    myvar = data;
    // console.log(myvar);

      geojsonLayer = L.geoJson(myvar);

     var marker2 = L.Marker.movingMarker(myvar,
         [3000, 9000, 9000, 4000,3000, 9000, 9000, 4000,3000, 9000, 9000, 4000,3000, 9000, 9000, 4000], {autostart: true,icon: car}).addTo(map);
     L.polyline(myvar, {color: 'red'}).addTo(map);
};
