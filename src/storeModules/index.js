import Vue from 'vue'
import Vuex from 'vuex'

import window from './modules/window'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        window
    }
  })