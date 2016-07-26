$(document).ajaxStart(function(){
     $('#cargando').show();
   });
   $(document).ajaxStop(function(){
        $('#cargando').hide();
      });
var featureGroup = L.featureGroup().addTo(map);
var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: featureGroup
  },
  draw: {
    polygon: false,
    polyline: false,
    rectangle: true,
    circle: false,
    marker: false
  }
}).addTo(map);

map.on('draw:created', showPolygonArea);
map.on('draw:edited', showPolygonAreaEdited);

function showPolygonAreaEdited(e) {
  e.layers.eachLayer(function(layer) {
    showPolygonArea({ layer: layer });
  });
}
function showPolygonArea(e) {
    layer = e.layer;
    var latlngs = (layer.getLatLngs());
    var diagonal = JSON.stringify([latlngs[1], latlngs[3]]);
     console.log(diagonal);
  featureGroup.clearLayers();
  featureGroup.addLayer(e.layer);
  e.layer.bindPopup((LGeo.area(e.layer) / 1000000).toFixed(2) + ' km<sup>2</sup>');
  e.layer.openPopup();
   $.ajax({
  type: "POST",
  url: "/cars_in_zone.json",
  data: {coordinates:diagonal},
  success:  function(data) {
    console.log(data)
   data.forEach(function(car_id) {

        $("#sidebar").append(
          '<div class="item" id="' + car_id + '"> <input type="radio" id="' + car_id + '" name="  car_id  ">Vehicle ID ' + car_id +'</div>')
          console.log($(".item"))
          // $(".item").remove()
        });

    }
});
  }
