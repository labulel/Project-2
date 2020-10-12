// Creating map object
// var myMap = L.map("map", {
//   center: [39.8283, -98.5795],
//   zoom: 5.3
// });

//Create a list for years
var years = [2015, 2016, 2017, 2018, 2019, 2020]

mapboxgl.accessToken = API_KEY;
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v10',
center: [-95.9345, 41.2565],
zoom: 3.8
});






// Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(myMap);

// // Use this link to get the geojson data.
// var link = "static/data/nyc.geojson";

// // Grabbing our GeoJSON data..
// d3.json(link, function(data) {
//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data).addTo(myMap);
// });

var link2 = "static/data/daily_aqi_by_county_2020.csv"
d3.csv(link2, function (d) {
  console.log(d)
})


