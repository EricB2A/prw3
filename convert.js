function parseJSON(rawJSON){
    let last_datetime = moment('1970-01-01', 'YYYY-MM-DD'); // group activity per day
    let activity_count = 0; // activity count for each day
    const result = {}; // final dict

    for(let key in rawJSON){
        if(rawJSON[key]['_type'] === "HKQuantityTypeIdentifierDistanceWalkingRunning"){
            let current_datetime = moment(rawJSON[key]['_startDate'], 'YYYY-MM-DD');
            if(result[current_datetime.unix()] != undefined){
                result[current_datetime.unix()] += parseFloat(rawJSON[key]['_value']);
            }else{
                result[current_datetime.unix()] = parseFloat(rawJSON[key]['_value']);
            }
        }
    }

    return result;
}

function sortKeys(rawJSON){
    return _(rawJSON).toPairs().sortBy(0).fromPairs().value();
}

function convertDatetime(rawJSON){
    const result = {};
    for(let key in rawJSON){
        if(rawJSON.hasOwnProperty(key)){
            result[moment.unix(key).format("YYYY-MM-DD")] = rawJSON[key];
        }
    }
    return result
}

function convert(rawXML){
    //
    console.log("converting...");
    var x2js = new X2JS();
    var rawJSON = x2js.xml_str2json(rawXML);
    console.log("parsing...");
    return convertDatetime(sortKeys(parseJSON(rawJSON.HealthData.Record)));
}