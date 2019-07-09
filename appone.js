function buildMetadata(sample) {
  d3.json(`/metadata/${sample}`).then(function(sample_metadata){
    d3.select(".panel-body").html("")
  console.log(sample_metadata)
  d3.select(".panel-body").append("p")

  Object.entries(sample_metadata).forEach(function([key,value]){

      d3.select(".panel-body").append("p").text(`${key}, ${value}`)
    })

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  
    // console.log(sample)
    // Object.defineProperties()

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  });
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then(function(data) {
    var bubbleData={
      x:data.otu_ids,
      y:data.sample_values,
      mode:'markers',
      text:data.otu_labels,
      marker:{
        size:data.sample_values,
        color:data.otu_ids,
      }
 
    }
    var bubbleData=[bubbleData];
    var bubbleLayout = {
      showlegend: false,
      height: 600,
      width: 1500
    }
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);


    // @TODO: Build a Bubble Chart using the sample data
    // look at activity #8 from day 1 on scatter plot
    
    


   

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each)
    var pieData = [{
      values : data.sample_values.slice(0,10),
      labels : data.otu_ids.slice(0,10),
      type : "pie",
    }];


    var layout = {
      showlegend: true,
    };
   
    Plotly.newPlot('pie', pieData,layout);
  

  });

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
