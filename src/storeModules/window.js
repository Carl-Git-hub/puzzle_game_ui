const state = {
    width: ''
  }
  
  const mutations = {
  
    setWidth (state, width) {
      state.width = width
    }
  }
  
  const actions = {
    setWidth: ({ commit }, width) => {
      commit('setWidth', width)
    }
  }
  
  export default {
    state,
    mutations,
    actions
  }
  