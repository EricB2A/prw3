Helper.loadJSON(function(rawData){
  var activityData = Helper.restructure(JSON.parse(rawData));
  displayChart(activityData);
});

function changeFormat(newFormat){
  Helper.loadJSON(function(rawData){
    let newData = Helper.groupDataBy(Helper.restructure(JSON.parse(rawData)), newFormat);
    displayChart(newData);

  });
  return true
}

function displayChart(data){
  var ctx = document.getElementById("dataVisualisation").getContext("2d");
  //TODO: delete if already exists.
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

function useUserData(){
  var input = document.getElementById("userXML");
  var reader = new FileReader();
  reader.readAsText(input.files[0], "UTF-8");
  reader.onload = function(evt){
    // change form XML to json
    var data = evt.target.result;
    var json = convert(data);
    console.log(json);
    console.log(typeof json);
    if (Helper.isJsonValid(JSON.stringify(json))){ // valid
      var activityData = Helper.restructure(JSON.stringify(json));
      displayChart(activityData);
    }else{
     console.log("USER DATA not valid"); //TODO: show message 
    } 
  }
}