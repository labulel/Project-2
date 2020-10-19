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
 
  var dates = []
  Object.entries(data.features[0].properties).forEach(([key]) => {
    if (key.startsWith("aqi")){
      dates.push(key)
    }

  } )
console.log("start with: " + dates[0]);
console.log("ends with: " + dates[dates.length-1])

  
//   dates.forEach((date) => {var newdata = [];
//     data.features.forEach((item) => {
//       Object.entries(item.properties).forEach((key) => {
  
//         // console.log(key)
//         // console.log(date)
//         if (key[0] == date){
//         fulldata = {"NAME":item.properties.NAME,"STATE":item.properties.STATE, date: item.properties.date}
//         newdata.push({"properties":fulldata, "type":item.type, "geometry":item.geometry})
//       }
        
        
//       })
//   })
//   console.log(newdata)
//   testlayer = L.geoJson({"features":newdata})
//   sliderControl = L.control.sliderControl({position: "topright", layer: testlayer, range: true});
// })


function update(year){
  slider.property("value", year);
  d3.select(".year").text(year);
  countyShapes.style("fill", function(d) {
    return color(d.properties.years[year][0].rate)
  });
}


var slider = d3.select(".slider")
.append("input")
  .attr("type", "range")
  .attr("min", dates[0])
  .attr("max", dates[dates.length-1])
  .attr("step", 1)
  .on("input", function() {
    var year = this.value;
    update(year);
  });


// Create a new choropleth layer
geojson = L.choropleth(data, {

  // Define what  property in the features to use, we can update this line to show a different year.
  valueProperty: this.value,

  // // Set color scale
  scale: ["#ffffb2", "#b10026"],
  // // Number of breaks in step range
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
    layer.bindPopup("State: " + feature.properties.NAME + "<br>Speakers:<br>" +
      "AQI" + feature.properties.aqi-2015-01-01);
  }
}).addTo(myMap);




//Create a marker layer
//var testlayer = L.geoJson(json);


//Add the slider to the map
// myMap.addControl(sliderControl);

//And initialize the slider
// sliderControl.startSlider();

// $('#slider-timestamp').html(options.markers[ui.value].feature.properties.time.substr(0, 19));


});