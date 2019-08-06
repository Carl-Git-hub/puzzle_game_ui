const API_ENDPOINT = process.env.VUE_APP_API_ROOT_ENDPOINT

export default {
  ENDPOINTS: {
    JOIN_ROOM : API_ENDPOINT + '/player/join',
    MOVE_PLAYER: API_ENDPOINT + '/player/move',
    ADD_GROUND: API_ENDPOINT + '/player/addGround',
    POSITION: API_ENDPOINT + '/player/position',
    GROUND: API_ENDPOINT + '/player/ground',
    ROOM: API_ENDPOINT + 'room'
  },
  blockType: {
    I: [
      [[-1, 1], [0, 1], [1, 1], [2, 1]],
      [[1, 2], [1, 1], [1, 0], [1, -1]]
    ],
    O: [
      [[0, 0], [0, 1], [1, 1], [1, 0]]
    ],
    T: [
      [[0, 1], [-1, 0], [0, 0], [1, 0]],
      [[1, 0], [0, 1], [0, 0], [0, -1]],
      [[0, -1], [1, 0], [0, 0], [-1, 0]],
      [[-1, 0], [0, -1], [0, 0], [0, 1]]
    ],
    S: [
      [[0, 1], [1, 1], [-1, 0], [0, 0]],
      [[1, 0], [1, -1], [0, 1], [0, 0]]
    ],
    Z: [
      [[-1, 1], [0, 1], [0, 0], [1, 0]],
      [[1, 1], [1, 0], [0, 0], [0, -1]]
    ],
    J: [
      [[-1, 1], [-1, 0], [0, 0], [1, 0]],
      [[1, 1], [0, 1], [0, 0], [0, -1]],
      [[1, -1], [1, 0], [0, 0], [-1, 0]],
      [[-1, -1], [0, -1], [0, 0], [0, 1]]
    ],
    L: [
      [[1, 1], [1, 0], [0, 0], [-1, 0]],
      [[1, -1], [0, -1], [0, 0], [0, 1]],
      [[-1, -1], [-1, 0], [0, 0], [1, 0]],
      [[-1, 1], [0, 1], [0, 0], [0, -1]]
    ]
  }
}