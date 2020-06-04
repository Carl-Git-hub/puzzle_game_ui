import Vue from 'vue'
import Vuetify from 'vuetify'
import Vue2TouchEvents from 'vue2-touch-events'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'
import router from './router'
import store from './store'

import 'vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(Vue2TouchEvents, {
  disableClick: false,
  touchClass: '',
  tapTolerance: 10,
  touchHoldTolerance: 400,
  swipeTolerance: 40,
  longTapTimeInterval: 400
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
