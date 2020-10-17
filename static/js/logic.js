// Creating map object
var myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 5.3
});

//Create a list for years
// var years = [2015, 2016, 2017, 2018, 2019, 2020]

// mapboxgl.accessToken = API_KEY;
// var map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/mapbox/light-v10',
// center: [-95.9345, 41.2565],
// zoom: 3.9
// });






// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
}).addTo(myMap);


// Load in geojson data

var geojson;

// The endpoint that we created to give us our data
url = '/data'

// // Grabbing our GeoJSON data..
d3.json(url, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data).addTo(myMap);
  console.log(data)

// Create a new choropleth layer
geojson = L.choropleth(data, {

  // Define what  property in the features to use, we can update this line to show a different year.
  valueProperty: "aqi-2015-01-01",

  // Set color scale
  scale: ["#ffffb2", "#b10026"],

  // Number of breaks in step range
  steps: 10,

  // q for quartile, e for equidistant, k for k-means
  mode: "q",
  style: {
    // Border color
    color: "#fff",
    weight: 1,
    fillOpacity: 0.8
  },
  // Binding a pop-up to each layer
  onEachFeature: function(feature, layer) {
    layer.bindPopup("State: " + feature.properties.state + "<br>Speakers:<br>" +
      "AQI" + feature.properties.aqi-2015-01-01);
  }
}).addTo(myMap);

});


//Create a marker layer
//var testlayer = L.geoJson(json);
var sliderControl = L.control.sliderControl({position: "topright", layer: geojson});

//Add the slider to the map
map.Control(sliderControl);

//And initialize the slider
sliderControl.startSlider();

$('#slider-timestamp').html(options.markers[ui.value].feature.properties.time.substr(0, 19));

sliderControl = L.control.sliderControl({position: "topright", layer: testlayer, range: true});