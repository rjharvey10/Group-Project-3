// Initializes the page with a default plot
function init() {
    d3.json("http://127.0.0.1:5000/get_data", function(response){
      function onlyUnique(value2, index2, self2) {
        return self2.indexOf(value2) === index2;
      }
      let sampleYears = response.map(value2 => value2["Year"])
      sampleYears = sampleYears.filter(onlyUnique);
      console.log(sampleYears)

      sampleYears.forEach((sample) => {
      selector
      .append("option")
        .text(sample)
        .property("value", sample);
    });
        console.log(response)

        d3.selectAll('div.panel-body').append('p').classed("mama", true).text('Current Year: 2014')
        d3.selectAll('div.panel-body').append('p').classed("papa", true).text('x-axis: Rank')
        d3.selectAll('div.panel-body').append('p').classed("baby", true).text('y-axis: Artist Names')

        function getyear(date) {
            return date["Year"] == "2014"
        }
        let year_data = response.filter(getyear)
        console.log(year_data)
    

        rank = year_data.map(my => my["Rank"])
        artist_name = year_data.map(my => my["Song Title"])
        console.log(artist_name)
        
    data = [{
      x: rank,
      y: artist_name,
    type: 'bar'}];

    var layout = {
        title:'Rankings per Year'
      };
  
    Plotly.newPlot("lineplot", data, layout);
    });
    let selector = d3.select("#selDataset");
    d3.json("http://127.0.0.1:5000/singer_count", function(response){
        let artist = response.map(row => row['Artist Name'])
        let rank = response.map(row => row['Rank'])
        console.log(rank)
        var trace1 = {
            x: artist,
            y: rank,
            type: 'scatter'
          };
          

          var layout2 = {
            title:'Instances of Top 25 by Artist (2014-2021)',
            xaxis: {
              title: {
                text: 'Artist Name'
              }
            },
            yaxis: {
              title: {
                text: 'Number of Top 25 Instances'
              }
            },
          };
        var data = [trace1];
        Plotly.newPlot('map', data, layout2);
        
    });
    

    d3.json("http://127.0.0.1:5000/pie", function(response){
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }
        let sampleNames = response.map(value => value["Artist Name"])
        sampleNames = sampleNames.filter(onlyUnique);

        console.log(sampleNames)
    sampleNames.forEach((sample2) => {
      incubator
        .append("option")
        .text(sample2)
        .property("value", sample2);
    });
    
        function find_singer(singer) {
            // return player.madeTeam == true;
            // A more concise way to express a boolean conditional
            return singer["Artist Name"] == "Led Zeppelin";
          }
          
          // Call the custom function with filter()
          let singer_data = response.filter(find_singer);

          years = singer_data.map(song => song["Year"])
          songs = singer_data.map(song => song["Rank"])
          console.log(songs)

          var data = [{
            values: songs,
            labels: years,
            type: 'pie'
          }];

          var layout = {
            title:'Percentage Won By Selected Singer'
          };

          Plotly.newPlot('pie', data, layout);
          
    });
    let incubator = d3.select("#pie_selector")
      
}
  d3.selectAll("#selDataset").on("change", updatePlotly);
  d3.selectAll("#pie_selector").on("change", updatePie);
  // Call updatePlotly() when a change takes place to the DOM

  
  // This function is called when a dropdown menu item is selected
function updatePlotly() {
  d3.json("http://127.0.0.1:5000/get_data", function(response){
    
    // Use D3 to select the dropdown menu
    var dropdownMenu2 = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu2.property("value");
    // Initialize x and y arrays

    function find_year(year) {
      // return player.madeTeam == true;
      // A more concise way to express a boolean conditional
      return year["Year"] == dataset;
    }
    d3.select('div.panel-body>p').classed("mama", true).text('year: '+dataset)
    let year_data = response.filter(find_year)
    console.log(year_data)

    rank = year_data.map(my => my["Rank"])
    artist_name = year_data.map(my => my["Song Title"])

    data = [{
      x: rank,
      y: artist_name,
    type: 'bar'}];

    var layout = {
        title:'Rankings vs. Years'
      };
  
    Plotly.newPlot("lineplot", data, layout);

  
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("lineplot", "x", [x]);
    Plotly.restyle("lineplot", "y", [y]);
  });
  }

function updatePie(){
    d3.json("http://127.0.0.1:5000/pie", function(response){
        console.log(response)
        var dropdownMenu = d3.select("#pie_selector");
        var choice = dropdownMenu.property("value");
        

        function find_singer(singer) {
            // return player.madeTeam == true;
            // A more concise way to express a boolean conditional
            return singer["Artist Name"] == choice;
          }
          
          // Call the custom function with filter()
          let singer_data = response.filter(find_singer);
          console.log(singer_data)

          years = singer_data.map(song => song["Year"])
          songs = singer_data.map(song => song["Rank"])

          Plotly.restyle("pie", "values", [songs]);
          Plotly.restyle("pie", "labels", [years]);

        });
  }



  init();










