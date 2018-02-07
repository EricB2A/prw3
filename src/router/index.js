import Vue from 'vue'
import Router from 'vue-router'
import Visualisation from '@/components/Visualisation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Visualisation',
      component: Visualisation
    }
  ]
})
