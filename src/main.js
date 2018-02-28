// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// TODO: use config for filepath
import activityData from '../data/processed/processed.json'

/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    activityData: ''
  }
})
vue.activityData = activityData
