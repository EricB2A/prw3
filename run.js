Helper.loadJSON(function(rawData){
  var activityData = Helper.restructure(JSON.parse(rawData));
  console.log(activityData);
  displayChart(activityData);
});

function changeFormat(newFormat){
  Helper.loadJSON(function(rawData){

    let newData = Helper.groupDataBy(Helper.restructure(JSON.parse(rawData)), newFormat);
    console.log("new data wuth " + newFormat)
    console.log(rawData)
    displayChart(newData);

  });
  return true
}

function displayChart(data){
  var ctx = document.getElementById("dataVisualisation").getContext("2d");
  //TODO: delete if already exists.
  console.log(data);
  var options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: true
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }]
    },
    legend: {
      display: true
    },
    responsive: true,
    maintainAspectRatio: false
  };

  var chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options
  });
  console.log("running...");
}
