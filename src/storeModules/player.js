const state = {
    players: [
      {
        curBlockShape: 'O',
        curBlockRot: 0,
        curBlockPos: {x: 4, y: 1}
      },
      {
        curBlockShape: 'O',
        curBlockRot: 0,
        curBlockPos: {x: 4, y: 1}
      }
    ]
  }
  
  const mutations = {
    setBlockPos (state, payload) {
      state.players[payload.player].curBlockPos.x = payload.x
      state.players[payload.player].curBlockPos.y = payload.y
    },
    setBlockShape (state, payload) {
      state.players[payload.player].curBlockShape = payload.blockType
    },
    setRotIndex (state, payload) {
      state.players[payload.player].curBlockRot = payload.rotIndex
    }
  }
  
  const actions = {
    setBlockPos: ({ commit }, payload) => {
      commit('setBlockPos', payload)
    },
    setBlockShape: ({ commit }, payload) => {
      commit('setBlockShape', payload)
    },
    setCurBlockRot: ({ commit }, payload) => {
      commit('setRotIndex', payload)
    }
  }
  const getters = {
    getBlockPos: state => {return player => state.players[player].curBlockPos},
    getBlockShape: state => {return player => state.players[player].curBlockShape},
    getCurBlockRot: state => {return player => state.players[player].curBlockRot}
}
  
  export default {
    state,
    mutations,
    getters,
    actions
  }
  