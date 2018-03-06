 <line-chart>
 </line-chart>

<script>
import { Line, Bar } from 'vue-chartjs'
import activity_data from '../../data/processed/processed.json'
const helper = require("./helper.js").default;

let day_data_structured = helper.restructure(activity_data);
let data_structured = helper.group_date_by(day_data_structured, "YYYY-MM-DD");
console.log("====")
console.log(data_structured);
console.log("====")

let options = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
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
}

export default {
  extends: Line,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(data_structured, options)
  }
}

</script>
<style>
  #line-chart { 
    display:none;
  }
</style>

