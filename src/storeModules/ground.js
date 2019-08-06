import constants from '../const'
import _ from 'lodash'

import axios from 'axios'

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
  updateGround(state, payload) {
    state.players[payload.player].groundState = []
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
  addShapeToGround: ({ commit, rootGetters }, payload) => {
    if (rootGetters['player/isMultiplayerMode']) {
      axios.post(constants.ENDPOINTS.ADD_GROUND, {
        'roomName': rootGetters['player/getRoomName'],
        'playerToken': rootGetters['player/getPlayerToken'](payload.player),
        'addBlocks': payload.blocks
      })
    }
    commit('addShapeToGround', payload)
  },
  clearRows: ({ commit, rootGetters }, payload) => {
    payload.numCols = rootGetters['panelConfig/getNumCols']
    commit('clearRows', payload)
  },
  async updateGroundState({ commit, rootGetters }, payload) {
    const resp = await axios.get(constants.ENDPOINTS.GROUND, { params: {
      'roomName': rootGetters['player/getRoomName'],
      'playerToken': rootGetters['player/getPlayerToken'](payload.player)
    }})
    commit('updateGround', {
      'player': payload.player,
      'blocks': resp.data.currentBlocks,
    })
  }
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
