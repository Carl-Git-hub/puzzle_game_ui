const state = {
  groundState: [[]]
}

const mutations = {
  addShapeToGround(state, payload) {
    for (let block of payload.blocks) {
      state.groundState[block.y][block.x] = block.shape
    }
  }
}

const actions = {
  addShapeToGround: ({ commit }, payload) => {
    commit('addShapeToGround', payload)
  },
}
const getters = {
  getGroundState: state => state.groundState,
}

export default {
  state,
  mutations,
  getters,
  actions
}
