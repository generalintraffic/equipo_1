L.Icon.Big = L.Icon.Default.extend({
  options: {
  iconSize: new L.Point(30, 49),
}});

    var markers = new Array();
//ICONOS
var bigIcon = new L.Icon.Big();
var smallIcon = new L.Icon.Default();

  map.on('click', onMapClick);

  function onMarkerClick(e) {
     for (var mark in markers){
          markers[mark].setIcon(smallIcon);}
    var offset =    map._getNewTopLeftPoint(e.target.getLatLng()).subtract(map._getTopLeftPoint());
  map.panBy(offset);
  }

  function onMapClick(e) {
    var marker = new L.Marker(e.latlng);
    marker.on('click', onMarkerClick);
    map.addLayer(marker);
    marker.bindPopup("Marker");
    $('#sidebar').append(
    '<div class="item" id="' + marker._leaflet_id + '">CarName ' + marker._leaflet_id + ' - <a href="#" 	class="remove" id="' + marker._leaflet_id + '">remove</a></div>');
    markers[marker._leaflet_id] = marker;

    $('.item').on("mouseover", function () {
        $('div').removeClass('active');
        $(this).addClass('active');
        for (var mark in markers){
          markers[mark].setIcon(smallIcon);}
        markerFunction($(this).attr('id'))
        markers[$(this).attr('id')].setIcon(bigIcon);
        var mid = $(this).attr('id');

    });
  }

  function markerFunction(id){
  markers[id].openPopup();
  }
