const fs = require('fs');
const parser = require('xml2json');
const moment = require('moment');

function loopObject(data_object){
    // looping through our big boy
    let last_datetime = null;	
	let activity_count = 0;
	const result = {};

    for(let key in data_object){
        if(data_object.hasOwnProperty(key)){
            let current_datetime = moment(data_object[key]['startDate'], "YYYY-MM-DD");            
	    	if(last_datetime > current_datetime){ // if different then
			print(current_datetime);	
			result[current_datetime] = activity_count;
			last_datetime = current_datetime;
		    }
		    activity_count += data_object[key]['value']
        }
    }
	console.log(result);
 
}
function parseJson(raw_json){
    const json = JSON.parse(raw_json);
    loopObject(json.HealthData.Record);
    fs.writeFile('data/processed/processed.json', JSON.stringify(json.HealthData.Record, null, 4), 'utf8', {flag: 'wx'}, (err) => {
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
