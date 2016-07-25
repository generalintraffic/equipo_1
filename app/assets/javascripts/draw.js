// var featureGroup = L.featureGroup().addTo(map);
// var drawControl = new L.Control.Draw({
//   edit: {
//     featureGroup: featureGroup
//   },
//   draw: {
//     polygon: false,
//     polyline: false,
//     rectangle: true,
//     circle: true,
//     marker: false
//   }
// }).addTo(map);
//
// map.on('draw:created', showPolygonArea);
// map.on('draw:edited', showPolygonAreaEdited);
//
// function showPolygonAreaEdited(e) {
//   e.layers.eachLayer(function(layer) {
//     showPolygonArea({ layer: layer });
//   });
// }
// function showPolygonArea(e) {
//   featureGroup.clearLayers();
//   featureGroup.addLayer(e.layer);
//   e.layer.bindPopup((LGeo.area(e.layer) / 1000000).toFixed(2) + ' km<sup>2</sup>');
//   e.layer.openPopup();
// }
// var RADIUS = 300;
// var filterCircle = L.circle(L.latLng(0, 0), RADIUS, {
//     opacity: 1,
//     weight: 1,
//     fillOpacity: 0.4,
//     color: 'green'
// }).addTo(map);
//
// var csvLayer = omnivore.csv('DATA', null, L.mapbox.featureLayer()).addTo(map);
//
// map.on('click', function(e) {
//     filterCircle.setLatLng(e.latlng);
//     csvLayer.setFilter(function showAirport(feature) {
//         return e.latlng.distanceTo(L.latLng(
//                 feature.geometry.coordinates[1],
//                 feature.geometry.coordinates[0])) < RADIUS;
//     });
// });
