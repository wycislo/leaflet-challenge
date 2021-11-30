
  // earthquaks for the past 4.5 months 
  var usgs_data = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson';


// Create a map object.
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
});
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


  d3.json(usgs_data).then(function (data) {
    
    createMaplayers(data.features)    
  });




  function createMaplayers(earthquakeData)
    {
        console.log(earthquakeData);

    var earthquake_list = [];
    var earthquake_location = [];

    function chooseColor(size) {
        if (size > 90) color = "rgb(255,95,102)";
        else if (size > 70) color = "rgb(255,164,101)";
        else if (size > 50) color = "rgb(250,220,66)";
        else if (size > 30) color = "rgb(250,220,66)";
        else if (size > 10) color = "rgb(218,245,70)";
        else color = "rgb(153,247,69)";
        return color;
    }
  

    earthquakeData.forEach(x=>{
            console.log(x.points);
            earthquake_location = [x.geometry.coordinates[1], x.geometry.coordinates[0]];
            earthquake_list.push(L.circle(x.location, 
                {
                fillOpacity: 0.25,
                color: "white",
                fillColor: chooseColor(x.geometry.coordinates[2]),
                stroke: 0.1,
                radius: x.properties.mag * 100000
                })
                .bindPopup(`<h3>${x.properties.place}</h3><hr><p>${new Date(x.properties.time)}</p>`)
                .addTo(myMap));
            });
    };


