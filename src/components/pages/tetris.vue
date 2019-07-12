<template>
  <div @keydown.left="moveLeft" @keydown.right="moveRight" @keydown.down="moveDown" @keydown.up="rotateBlock" tabindex="0">
    <panel :bus="busPanel" :rowSize="getNumRows" :colSize="getNumCols" class="panel"></panel>
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
      if (this.getBlockPos.x - 1 < 0) {
        return
      }
      this.setBlockPos({
        x: this.getBlockPos.x - 1,
        y: this.getBlockPos.y
      })
      this.busPanel.$emit('render') 
    },
    moveRight () {
      if (this.getBlockPos.x + 1 > this.getNumCols) {
        return
      }
      this.setBlockPos({
        x: this.getBlockPos.x + 1,
        y: this.getBlockPos.y
      })
      this.busPanel.$emit('render') 
    },
    moveDown () {
      if (this.getBlockPos.y + 1 > this.getNumRows) {
        return
      }
      this.setBlockPos({
        x: this.getBlockPos.x,
        y: this.getBlockPos.y + 1
      })
      this.busPanel.$emit('render') 
    },
    rotateBlock () {
      this.setCurBlockRot((this.getCurBlockRot+1) % constants.blockType[this.getBlockShape].length)
      this.busPanel.$emit('render') 
    },
    getCurrentBlockPosition() {
      var currentBlockPositions = []
      for (let blockPosValues of constants.blockType[this.getBlockShape][this.getCurBlockRot]) {
        currentBlockPositions.push(
          { y: blockPosValues[0] + this.getBlockPos.y,
            x: blockPosValues[1] + this.getBlockPos.x,
            shape: this.getBlockShape
          }
        )
      }
      return currentBlockPositions
    },
    checkIfTouchGround() {
      const currentBlocks = this.getCurrentBlockPosition()
      for (let block of currentBlocks) {
        for (let groundBlock of this.getGroundState) {
          if (groundBlock[block.y + 1] && groundBlock[block.y + 1][block.x]) {
            return true
          }
        }
        if (block.y >= this.getNumRows) {
          return true
        }
      }
      return false
    },
    dropBlock() {
      return {
        x: this.getBlockPos.x,
        y: this.getBlockPos.y + 1
      }
    }
  },
  created () {
    this.setBlockShape(_.sample(Object.keys(constants.blockType)))
    window.addEventListener("keydown", function(e) {
      // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
    }}, false);
  },
  mounted() {
    var self = this
    self.setBlockDrop = setInterval(function() {
      const currentBlocks = self.getCurrentBlockPosition()
      if (self.checkIfTouchGround(currentBlocks)) {
        self.addShapeToGround(currentBlocks)
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
