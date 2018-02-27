

<script>
function restructure(data_object) {
    // change the structure of object to adapt to charjs as
    /*
        {
          labels: ['January', 'February'],
          datasets: [
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
// LineChart.js
import { Line, Bar } from 'vue-chartjs'
import activity_data from '../../data/processed/processed.json'

const data_scrutured = restructure(activity_data);
console.log(data_scrutured);

export default {
  extends: Line,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(data_scrutured, this.options)
  }
}


</script>
