// L.mapbox.accessToken = 'pk.eyJ1IjoiYXJnZWwyMCIsImEiOiJjaXFyZWI5aDkwMnc4ZnBubjRldjU1Zm1lIn0.zNLRT-KVO3rsfaAquFZK3w';
// var map = L.mapbox.map('map', 'mapbox.streets').setView([10.48815, -66.87653], 13);
//
//
// // ----------MARCADOR CUSTOM--------------------------------------------
// var car = L.icon({
//    iconUrl: './car.jpg',
//    iconSize:     [38, 95],
//     });
// function onMapClick(e) {
//     console.log("latitud " + e.latlng);
//     // marker = L.marker(e.latlng,{icon:car,draggable:true,title:'origen'}).addTo(map);
// }
//
// map.on('click', onMapClick);
//
// var myLines = {
//     "type": "LineString",
//     "coordinates": [[10.48815, -66.87653], [10.48830, -66.87670],
//                     [10.48815, -66.87343], [10.48830, -66.82370]]
// }
//
// var myStyle = {
//     "color": "#ff7800",
//     "weight": 5,
//     "opacity": 0.65
// };
//
// var partvenezuela = [[10.48815, -66.87653]];
//
// map.fitBounds(partvenezuela);
//
// var marker1 = L.Marker.movingMarker(myLines.coordinates, [10000,10000,10000]).addTo(map);
// L.polyline(myLines.coordinates).addTo(map);
// marker1.once('click', function () {
//     marker1.start();
//     marker1.on('click', function() {
//         if (marker1.isRunning()) {
//             marker1.pause();
//         } else {
//             marker1.start();
//         }
//     });
//     setTimeout(function() {
//     }, 2000);
// });
//
// marker1.bindPopup('<b>Click me to start !</b>');
// marker1.openPopup();