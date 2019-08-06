import constants from '../const'
// import _ from 'lodash'

import axios from 'axios'

const state = {
  multiplayerMode: false,
  readyToStart: false,
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
  },
  setReadyToStart(state, payload) {
    state.readyToStart = payload
  }
}

const actions = {
  setBlockPos: ({ commit }, payload) => {
    if (state.multiplayerMode) {
      axios.post(constants.ENDPOINTS.MOVE_PLAYER, {
        'roomName': state.roomName,
        'playerToken': state.players[payload.player].playerToken,
        'shape': {
          'y': payload.y,
          'x': payload.x,
          'shape': state.players[payload.player].curBlockShape,
          'rotation' : state.players[payload.player].curBlockRot
        }
      })
    }
    commit('setBlockPos', payload)
  },
  setBlockShape: ({ commit }, payload) => {
    if (state.multiplayerMode) {
      axios.post(constants.ENDPOINTS.MOVE_PLAYER, {
        'roomName': state.roomName,
        'playerToken': state.players[payload.player].playerToken,
        'shape': {
          'y': state.players[payload.player].y,
          'x': state.players[payload.player].x,
          'shape': payload.blockType,
          'rotation' : state.players[payload.player].curBlockRot
        }
      })
    }
    commit('setBlockShape', payload)
  },
  setCurBlockRot: ({ commit }, payload) => {
    if (state.multiplayerMode) {
      axios.post(constants.ENDPOINTS.MOVE_PLAYER, {
        'roomName': state.roomName,
        'playerToken': state.players[payload.player].playerToken,
        'shape': {
          'y': state.players[payload.player].y,
          'x': state.players[payload.player].x,
          'shape': state.players[payload.player].curBlockShape,
          'rotation' : payload.rotIndex
        }
      })
    }
    commit('setRotIndex', payload)
  },
  setMultiplayerMode: ({ commit }, payload) => {
    commit('setMultiplayerMode', payload)
  },
  setReadyToStart: ({ commit }, payload) => {
    commit('setReadyToStart', payload)
  },
  async joinRoom({ commit }, payload) {
    const resp = await axios.post(constants.ENDPOINTS.JOIN_ROOM, {
      'roomName': payload,
    })
    commit('setRoomName', resp.data.roomName)
    const playerToken = resp.data.playerToken
    commit('setPlayerToken', {
      player: 0,
      playerToken: playerToken
    })
    if (resp.data.readyToStart) {
      await commit('setPlayerToken', {
        player: 1,
        playerToken: resp.data.playersInRoom.filter(token => token !== playerToken )[0]
      })
    }
    commit('setReadyToStart', resp.data.readyToStart)
  },
  async updateRoomStatus({ commit }, payload) {
    const resp = await axios.get(constants.ENDPOINTS.ROOM, {
      params: {
        'roomName': payload
      }
    })
    if (resp.data.readyToStart) {
      const playerToken = state.players[0].playerToken
      await commit('setPlayerToken', {
        player: 1,
        playerToken: resp.data.playersInRoom.filter(token => token !== playerToken )[0]
      })
    }
    commit('setReadyToStart', resp.data.readyToStart)
  },
  async updateBlockPositions({ commit }, payload) {
    const resp = await axios.get(constants.ENDPOINTS.POSITION, { params: {
      'roomName': state.roomName,
      'playerToken': state.players[payload.player].playerToken
    }})
    commit('setBlockPos', {
      'player': payload.player,
      'x': resp.data.shape.x,
      'y': resp.data.shape.y
    })
    commit('setBlockShape', {
      'player': payload.player,
      'blockType': resp.data.shape.shape
    })
    commit('setRotIndex', {
      'player': payload.player,
      'rotIndex': resp.data.shape.rotation
    })
  }
}
const getters = {
  getBlockPos: state => { return player => state.players[player].curBlockPos },
  getBlockShape: state => { return player => state.players[player].curBlockShape },
  getCurBlockRot: state => { return player => state.players[player].curBlockRot },
  getPlayerToken: state => { return player => state.players[player].playerToken },
  getRoomName: state => state.roomName,
  isMultiplayerMode: state => state.multiplayerMode,
  isReadyToStart: state => state.readyToStart
}

export default {
  state,
  mutations,
  getters,
  actions
}
