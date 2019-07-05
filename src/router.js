import Vue from 'vue'
import Router from 'vue-router'
import Tetris from './components/pages/tetris.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'tetris',
      component: Tetris
    }
  ]
})
