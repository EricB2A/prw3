Helper.loadJSON(function(rawData){
    var activityData = Helper.restructure(JSON.parse(rawData));
    displayChart(activityData);
});

function storeData(data){
    var element = document.getElementById("activity-data");
    element.innerHTML = JSON.stringify(data);
    element.style.display = "none"; // we assure its still hidden
}

function getData(){
    let domElementData = document.getElementById("activity-data").innerHTML;
    console.log("reading element...");
    console.log(domElementData);
    //console.log(JSON.parse(domElementData));
    //console.log(Helper.isJsonValid(JSON.parse(domElementData)));
    console.log(".");
    if (domElementData){
        console.log("data found...");
        return JSON.parse(domElementData);
    }
    return false;
}

function changeFormat(newFormat){
    var storedDataString = getData();
    if(storedDataString){
        console.log("using stored data");
        displayChart(Helper.groupDataBy(Helper.restructure(JSON.parse(storedDataString)), newFormat))
    }else{
        console.log("using xml data");
        Helper.loadJSON(function(rawData) {
            var storedData = Helper.groupDataBy(Helper.restructure(JSON.parse(rawData)), newFormat);
            displayChart(storedData);
        });
    }
}

function displayChart(data){
    var ctx = document.getElementById("dataVisualisation").getContext("2d");
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
    Helper.loading(true);
    var input = document.getElementById("userXML");
    var reader = new FileReader();
    reader.readAsText(input.files[0], "UTF-8");
    reader.onload = function(evt){
        // change form XML to json
        var data = evt.target.result;
        var json = convert(data);
        var json_string = JSON.stringify(json);
        if (Helper.isJsonValid(json_string)){ // valid
            var activityData = Helper.restructure(json);
            Helper.loading(false);
            storeData(json_string);
            displayChart(activityData);
        }else{
            console.log("USER DATA not valid"); //TODO: show message
        }
    }
}