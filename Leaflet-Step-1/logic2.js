

// earthquaks for the past 4.5 months 
var usgs_data = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson';

// center of united states
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 3
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(usgs_data).then(function (data) 
{

createFeatures(data.features);
createMap(earthquakes);

});

function choosecolor(size){
  var color = "red";
  if(size>=200) color = "yellow";
  else if(size>=100) color = "blue";
  else if(size>=90) color = "green";
  return color;
}


function createFeatures(earthquakeData) {
  function OnEachFeature(feature, layer) {
    L.circle(x.location, {
    fillOpacity: 0.25,
    color: "white",
    fillColor: choosecolor(x.points),
    stroke: 0.1,
    radius: Math.sqrt(x.points) * 10000
  })
  .bindPopup(`<h1>${x.name}</h1> <hr> <h3>Population: ${x.points.toLocaleString()}</h3>`)
  .addTo(myMap)
  
  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature 
  });
  }

  

}
// addMarker()
// data.forEach(x=>{
//   L.circle(x.location, {
//     fillOpacity: 0.25,
//     color: "white",
//     fillColor: choosecolor(x.points),
//     stroke: 0.1,
//     radius: Math.sqrt(x.points) * 10000
//   })
//   .bindPopup(`<h1>${x.name}</h1> <hr> <h3>Population: ${x.points.toLocaleString()}</h3>`)
//   .addTo(myMap)
// })
// });



// function createFeatures(earthquakeData) {
// // console.log(earthquakeData.features)
//   // Define a function that we want to run once for each feature in the features array.
//   // Give each feature a popup that describes the place and time of the earthquake.
//   function onEachFeature(feature, layer) {
//     // layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    
//   }

//   // Create a GeoJSON layer that contains the features array on the earthquakeData object.
//   // Run the onEachFeature function once for each piece of data in the array.
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature 
//   });

// //   // Send our earthquakes layer to the createMap function/
// //   console.log(earthquakes);
//   createMap(earthquakes);
// }

function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // // Create a baseMaps object.
  // var baseMaps = {
  //   "Street Map": street,
  //   "Topographic Map": topo
  // };

  // // Create an overlay object to hold our overlay.
  // var overlayMaps = {
  //   Earthquakes: earthquakes
  // };

  // // Create our map, giving it the streetmap and earthquakes layers to display on load.
  // var myMap = L.map("map", {
  //   center: [
  //     37.09, -95.71
  //   ],
  //   zoom: 5,
  //   layers: [street, earthquakes]
    
  // });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  // L.control.layers(baseMaps, overlayMaps, {
  //   collapsed: false
  // }).addTo(myMap);
