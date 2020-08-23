d3.json("samples.json").then(function(data){
    console.log(data);
});

function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
init();


function buildCharts(sample) {
//Read samples.json and build the variables
  d3.json("samples.json").then(function({samples}) {
    //var samples = data.samples;
    var result = samples.filter(sampleObj => sampleObj.id == sample)[0];

  // save top 10 to array
    var topTenOtuIds = result.otu_ids.map((row) => `OTU ID: ${row}`).slice(0, 10);
    var topTenSampleValues = result.sample_values.slice(0, 10);
    var topTenOtuLabels = result.otu_labels.slice(0, 10);


    var trace = {
      x: topTenSampleValues,
      y: topTenOtuIds,
      text: topTenOtuLabels,
      type: "bar",
      orientation: "h"
    };

    var data = [trace];
    var layout = {
      title: "Top 10 OTU",
    };
    Plotly.newPlot("bar", data, layout);

      var trace1 = {
        x: result.otu_ids,
        y: result.sample_values,
        text: result.otu_labels,
        mode: "markers",
        markers: {
          size: result.sample_values,
          sizeref: 2.0,
          color: result.otu_ids,
          colorscale: 'Earth'
        }

      };

      var data1 = [trace1];
      var layout_2 = {
        margin: { t: 0},
        hovermode: 'closest',
        xaxis:{title: "OTU ID"},
        height: 600,
        width: 1000
      };
      Plotly.newPlot("bubble", trace1, layout_2);
  });
}


function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(key.toLowerCase() + ": " + value);
    });
  });
}
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}