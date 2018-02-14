const fs = require('fs');
const parser = require('xml2json');
const moment = require('moment');
const _ = require('lodash');

function loopObject(data_object){
    let last_datetime = moment('1970-01-01', 'YYYY-MM-DD'); // group activity per day
    let activity_count = 0; // activity count for each day
    const result = {}; // final dict
    for(let key in data_object){ // looping through our big boy
        if(data_object.hasOwnProperty(key)){
            if(data_object[key]['type'] === 'HKQuantityTypeIdentifierDistanceWalkingRunning'){ // we only keep the walked distance
                let current_datetime = moment(data_object[key]['startDate'], 'YYYY-MM-DD');            
                if(current_datetime.diff(last_datetime, 'days')){ // If we are in a new day 
                    result[current_datetime.unix()] = activity_count; // store result
                    last_datetime = current_datetime; 
                    activity_count = 0;
                }
                activity_count += parseFloat(data_object[key]['value']) // get the walked distance on this day
            }
        }
    }
    return result;
}

function sortKeys(obj){
    return _(obj).toPairs().sortBy(0).fromPairs().value();
}

function convertTimestampKeys(obj){
    const result = {};
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            result[moment.unix(key).format("YYYY-MM-DD")] = obj[key];
            // console.log(obj[key])    
        }
    }
    return result;
}
function parseJson(raw_json){
    const json = JSON.parse(raw_json);
    const result = convertTimestampKeys(sortKeys(loopObject(json.HealthData.Record)));
    fs.writeFile('data/processed/processed.json', JSON.stringify(result, null, 4), 'utf8', {flag: 'wx'}, (err) => {
        console.error('error while processing...');
        console.error(err);
    });

    /*
    json.HealthData.Record.forEach(element => {
        console.log(element);
        console.log("**");

    });
    */
}
// converts xml to json
fs.readFile('data/raw/export.xml', (err, data) => {
    parseJson(parser.toJson(data));
});
console.log('done.');