import _ from 'lodash'
const state = {
  players: [{
    groundState: []
  },
  {
    groundState: []
  }]
}

const mutations = {
  addShapeToGround(state, payload) {
    for (let block of payload.blocks) {
      if (!state.players[payload.player].groundState[block.y]) {
        state.players[payload.player].groundState[block.y] = []
      }
      state.players[payload.player].groundState[block.y][block.x] = block.shape
    }
  },
  clearRows(state, payload) {
    let newGroundState = []
    let numRowsRemoved = 0
    for (let groundRow of state.players[payload.player].groundState.reverse()) {
      if (!groundRow) {
        break
      }
      if (_.compact(groundRow).length >= payload.numCols) {
        numRowsRemoved = numRowsRemoved + 1
      } else {
        newGroundState.push(groundRow)
      }
    }
    while(newGroundState.length < state.players[payload.player].groundState.length) {
      newGroundState.push(undefined)
    }
    state.players[payload.player].groundState = newGroundState.reverse()
    // TODO add score based on numRowsRemoved
  }
}

const actions = {
  addShapeToGround: ({ commit }, payload) => {
    commit('addShapeToGround', payload)
  },
  clearRows: ({ commit, rootGetters }, payload) => {
    payload.numCols = rootGetters['panelConfig/getNumCols']
    commit('clearRows', payload)
  },
}
const getters = {
  getGroundState: state => {return player => state.players[player].groundState }
}

export default {
  state,
  mutations,
  getters,
  actions
}
