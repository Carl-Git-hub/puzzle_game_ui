const state = {
    curBlockShape: 'O',
    curBlockRot: 0,
    curBlockPos: {x: 4, y: 1}
  }
  
  const mutations = {
    setBlockPos (state, blockPos) {
      state.curBlockPos.x = blockPos.x
      state.curBlockPos.y = blockPos.y
    },
    setBlockShape (state, blockShape) {
      state.curBlockShape = blockShape
    },
    setRotIndex (state, rotIndex) {
      state.curBlockRot = rotIndex
    }
  }
  
  const actions = {
    setBlockPos: ({ commit }, blockPos) => {
      commit('setBlockPos', blockPos)
    },
    setBlockShape: ({ commit }, blockShape) => {
      commit('setBlockShape', blockShape)
    },
    setCurBlockRot: ({ commit }, rotIndex) => {
      commit('setRotIndex', rotIndex)
    }
  }
  const getters = {
    getBlockPos: state => state.curBlockPos,
    getBlockShape: state => state.curBlockShape,
    getCurBlockRot: state => state.curBlockRot
}
  
  export default {
    state,
    mutations,
    getters,
    actions
  }
  