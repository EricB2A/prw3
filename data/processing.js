const fs = require('fs');
const parser = require('xml2json');

function parseJson(raw_json){
    const json = JSON.parse(raw_json);
    fs.writeFile('data/processed/processed.json', json.HealthData.Record, 'utf8', (err) => {
        console.error('error while processing...');
        console.error(err);
    })

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
console.log('done');