import Vue from 'vue'
import Router from 'vue-router'
import PuzzleGame from './components/pages/PuzzleGame.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: PuzzleGame
    }
  ]
})
