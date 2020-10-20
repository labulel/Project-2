var sliderControl = null;

// Creating map object
var myMap = L.map("map", {
    center: [39.83, -98.58],
    zoom: 5
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


//   var marker = new L.marker([39.83, -98.58], {opacity: 0.01})
//   marker.bindTooltip("2015", {permanent: true})
//   marker.addTo(myMap)
  
  // Load in geojson data -> we don't need with when we're using a db
  //var geoData = "static/data/provinces_language.json";
  
  var geojson;
  
  // The endpoint that we created to give us our data
  url = '/data'
  
  // Grab data with d3
  d3.json(url, function(data) {
  
    console.log(data)
  
    // Create a new choropleth layer

    var aqi_data = Object.keys(data['features'][0]['properties']).filter(d => d.includes('aqi'))
    console.log(aqi_data)

    var chloro_layers = aqi_data.map(d => {

    //data['features'][0]['properties']['time'] = d

    return L.choropleth(data, {
  
      // Define what  property in the features to use, we can update this line to show a different year.
      valueProperty: d, //"aqi-2015-01-01",
  
      // Set color scale
      scale: ["#32a838", "#b10026"],
  
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
        layer.bindPopup("State: " + feature.properties.NAME + "<br>Speakers:<br>" +
          "AQI: " + feature.properties.english-2016);
      }
    })

    })

    var layers = L.layerGroup(chloro_layers);
  
// // Set up the legend
//     var legend = L.control({ position: "topleft" });
//     legend.onAdd = function() {
//       var div = L.DomUtil.create("div", "info legend");
//       var limits = [0, 300];
//       var colors = ["#32a838","#b10026"];
//       var labels = [];
  
//       // Add min & max
//       var legendInfo = "<h1>Air Quality</h1>" +
//         "<div class=\"labels\">" +
//           "<div class=\"min\">" + limits[0] + "</div>" +
//           "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//         "</div>";
  
//       div.innerHTML = legendInfo;
  
//       limits.forEach(function(limit, index) {
//         labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//       });
  
//       div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//       return div;
//     };
  
//     // Adding legend to the map
//     legend.addTo(myMap);



/*Legend specific*/
var legend = L.control({ position: "topleft" });

legend.onAdd = function(myMap) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Air Quality Index</h4>";
  div.innerHTML += '<i style="background: #32a838"></i><span>Good</span><br>';
  div.innerHTML += '<i style="background: #95db39"></i><span>Moderate</span><br>';
  div.innerHTML += '<i style="background: #cedb39"></i><span>Unhealthy for sensitive</span><br>';
  div.innerHTML += '<i style="background: #de7e35"></i><span>Very unhealthy</span><br>';
  div.innerHTML += '<i style="background: #b10026"></i><span>Hazardous</span><br>';

  return div;
};

legend.addTo(myMap);


    var sliderControl= L.control.sliderControl({layer: layers, follow:1})
    myMap.addControl(sliderControl);

//And initialize the slider
    sliderControl.startSlider();
  
  });
  
