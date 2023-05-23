
///////////////////
//  LEAFLET GPX  //
///////////////////
// https://github.com/mpetazzoni/leaflet-gpx

// console.log('Hola desde el js!')

const nom_arch = document.getElementById("nombre_archivo").innerHTML.trimStart()
// console.log(nom_ruta.trimStart())
// console.log('/rutas_gpx/'+nom_arch)

const map = L.map('map');

// CARTOGR. VECTORIAL:
var carto = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
})


// ORTOFOTO: 
var orto = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
})

orto.addTo(map)


function cambio_mapa(){
  if (map.hasLayer(orto)) {
      map.addLayer(carto);
      map.removeLayer(orto);
  } else {
      map.addLayer(orto);
      map.removeLayer(carto);
  }
}

const gpx = '/rutas_gpx/' + nom_arch; // URL to your GPX file or the GPX itself
new L.GPX(gpx, {
  async: true,
  marker_options: {
    startIconUrl: '',
    endIconUrl: '',
    shadowUrl: ''
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);