import axios from 'axios'

const state = {
  multiplayerMode: false,
  roomName: '',
  players: [
    {
      playerToken: '',
      curBlockShape: 'O',
      curBlockRot: 0,
      curBlockPos: { x: 4, y: 1 },
      score: 0
    },
    {
      playerToken: '',
      curBlockShape: 'O',
      curBlockRot: 0,
      curBlockPos: { x: 4, y: 1 },
      score: 0
    }
  ]
}

const mutations = {
  setBlockPos(state, payload) {
    state.players[payload.player].curBlockPos.x = payload.x
    state.players[payload.player].curBlockPos.y = payload.y
  },
  setBlockShape(state, payload) {
    state.players[payload.player].curBlockShape = payload.blockType
  },
  setRotIndex(state, payload) {
    state.players[payload.player].curBlockRot = payload.rotIndex
  },
  setMultiplayerMode(state, payload) {
    state.multiplayerMode = payload
  },
  setRoomName(state, payload) {
    state.roomName = payload
  },
  setPlayerToken(state, payload) {
    state.players[payload.player].playerToken = payload.playerToken
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
  },
  setMultiplayerMode: ({ commit }, payload) => {
    commit('setMultiplayerMode', payload)
  },
  async joinRoom ({ commit }, payload) {
    const resp = await axios.post(CONFIG.ENDPOINTS.TOP_RECEIVERS, { params: {
      'clientId': rootGetters['getClientId'],
      'startDate': payload.rangeDate.start,
      'endDate': payload.rangeDate.end,
      'offSetMinutes': new Date().getTimezoneOffset()
    }})
    commit('setMultiplayerMode', payload)
  }
}
const getters = {
  getBlockPos: state => { return player => state.players[player].curBlockPos },
  getBlockShape: state => { return player => state.players[player].curBlockShape },
  getCurBlockRot: state => { return player => state.players[player].curBlockRot },
  getPlayerToken: state => { return player => state.players[player].playerToken },
  getRoomName: state => state.roomName,
  isMultiplayerMode: state => state.multiplayerMode
}

export default {
  state,
  mutations,
  getters,
  actions
}
