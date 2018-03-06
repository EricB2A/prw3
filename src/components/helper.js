export default class {
    
    static restructure(data_object){
        // change the structure of object to adapt to charjs as: 
        /*
        {
            labels: ['January', 'February'],
            datasets: 
            [
                {
                    label: 'GitHub Commits',
                    backgroundColor: '#f87979',
                    data: [40, 20]
                }
            ]
        }
        */
        let new_structure = {};
        new_structure.labels = [];
        new_structure.datasets = [];
        new_structure.datasets[0] = {};
        new_structure.datasets[0].label = 'Activity data';
        new_structure.datasets[0].backgroundColor = '#f87979';
        new_structure.datasets[0].data = [];
        for(let key in data_object) { // looping through our big boy
            if(data_object.hasOwnProperty(key)) {
                //
                new_structure.labels.push(key);
                new_structure.datasets[0].data.push(data_object[key]);
            }
        }
        return new_structure;
    }

    static group_date_by(data_object, format){
        /*
            data_object dataset format : YYYY-MM-DD.

            FORMAT 1 : YYYY-MM-DD (DAY) > Default
            FORMAT 2 : YYYY-MM    (MONTH)
            FORMAT 3 : YYYY       (YEAR)
        */
        console.log("in ! ")
        let moment = require('moment');

        if(typeof format === "undefined"){
            format = "YYYY-MM-DD"
        }

        let new_labels = [];
        let new_datasets = [];

        let old_labels = data_object.labels;
        let old_dataset = data_object.datasets[0].data;

        let temp = {}
        console.log(old_labels);
        console.log(old_dataset);
        format = "YY-MM"

        for(let index in old_labels){ 
            console.log(typeof old_dataset[index]);
            if(temp[ moment(old_labels[index]).format(format) ]){
                temp[moment(old_labels[index]).format(format)] = old_dataset[index]
            }else{
                temp[moment(old_labels[index]).format(format)] += old_dataset[index]
            }


        }        
        console.log("CURSED WORD") 
        console.log(temp);

        data_object.label = new_labels;
        data_object.datasets[0] = new_datasets;
    }
}