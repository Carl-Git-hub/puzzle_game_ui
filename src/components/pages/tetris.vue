<template>
  <div @keydown.left="moveLeft" @keydown.right="moveRight" @keydown.down="moveDown" @keydown.up="rotateBlock" tabindex="0">
    <panel :bus="busPanel" :rowSize="getNumRows" :colSize="getNumCols" :player=0 class="panel"></panel>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'

import constants from '../../const'
import panel from '../organisms/panel.vue'

export default {
  name: 'tetris',
  data: () => {
    return {
      busPanel: new Vue()
    }
  },
  components: {
    panel
  },
  computed: {
    ...mapGetters({
      getNumRows: "panelConfig/getNumRows",
      getNumCols: "panelConfig/getNumCols",
      getBlockPos: "player/getBlockPos",
      getBlockShape: "player/getBlockShape",
      getCurBlockRot: "player/getCurBlockRot",
      getGroundState: "ground/getGroundState"
    })
  },
  methods: {
    ...mapActions({
      setBlockShape: 'player/setBlockShape',
      setBlockPos: 'player/setBlockPos',
      setCurBlockRot: 'player/setCurBlockRot',
      addShapeToGround: 'ground/addShapeToGround'
    }),
    moveLeft () {
      if (this.checkIfTouchWallsOrGround(0, -1)) {
        return
      }
      this.setBlockPos({
        x: this.getBlockPos(0).x - 1,
        y: this.getBlockPos(0).y,
        player: 0
      })
      this.busPanel.$emit('render') 
    },
    moveRight () {
      if (this.checkIfTouchWallsOrGround(0, 1)) {
        return
      }
      this.setBlockPos({
        x: this.getBlockPos(0).x + 1,
        y: this.getBlockPos(0).y,
        player: 0
      })
      this.busPanel.$emit('render') 
    },
    moveDown () {
      if (this.checkIfTouchWallsOrGround(1, 0)) {
        return
      }
      this.setBlockPos({
        x: this.getBlockPos(0).x,
        y: this.getBlockPos(0).y + 1,
        player: 0
      })
      this.busPanel.$emit('render') 
    },
    rotateBlock () {
      this.setCurBlockRot({
        rotIndex: (this.getCurBlockRot(0)+1) % constants.blockType[this.getBlockShape(0)].length,
        player: 0
      })
      this.busPanel.$emit('render') 
    },
    getCurrentBlockPosition() {
      var currentBlockPositions = []
      for (let blockPosValues of constants.blockType[this.getBlockShape(0)][this.getCurBlockRot(0)]) {
        currentBlockPositions.push(
          { y: blockPosValues[0] + this.getBlockPos(0).y,
            x: blockPosValues[1] + this.getBlockPos(0).x,
            shape: this.getBlockShape(0)
          }
        )
      }
      return currentBlockPositions
    },
    checkIfTouchWallsOrGround(yMove, xMove) {
      var blocks = this.getCurrentBlockPosition()
      for (let block of blocks) {
        if (this.getGroundState[block.y + yMove] && this.getGroundState[block.y + yMove][block.x + xMove]) {
          return true
        }
        if (block.y + yMove >= this.getNumRows) {
          return true
        }
        if (block.x + xMove >= this.getNumCols || block.x + xMove < 0) {
          return true
        }
      }
      return false
    },
    dropBlock() {
      return {
        x: this.getBlockPos(0).x,
        y: this.getBlockPos(0).y + 1,
        player: 0
      }
    }
  },
  created () {
    this.setBlockShape({
      blockType: _.sample(Object.keys(constants.blockType)),
      player: 0
    })
    window.addEventListener("keydown", function(e) {
      // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
    }}, false);
  },
  mounted() {
    var self = this
    self.setBlockDrop = setInterval(function() {
      if (self.checkIfTouchWallsOrGround(1, 0)) {
        self.addShapeToGround(self.getCurrentBlockPosition())
        self.setBlockShape({
          blockType: _.sample(Object.keys(constants.blockType)),
          player: 0
        })
        self.setBlockPos({
          x: 4,
          y: 1,
          player: 0
        })
        self.setCurBlockRot({
          rotIndex: 0,
          player: 0
        })
      } else {
        self.setBlockPos(self.dropBlock())
      }
      self.busPanel.$emit('render')
    }, 500);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
div:focus {
  outline: none;
}
.panel {
  width: 400px;
  height: 600px;
}
</style>
