const state = {
    curBlockShape: 'O',
    curBlockPos: {x: 0, y: 0}
  }
  
  const mutations = {
    setBlockPos (state, blockPos) {
      state.curBlockPos.x = blockPos.x
      state.curBlockPos.y = blockPos.y
    }
  }
  
  const actions = {
    setBlockPos: ({ commit }, blockPos) => {
      commit('setBlockPos', blockPos)
    }
  }
  
  export default {
    state,
    mutations,
    actions
  }
  