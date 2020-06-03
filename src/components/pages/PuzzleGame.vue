<template>
  <div>
    <player-select v-on:startGame="startGame"></player-select>
    <div
      class="game-box"
      @keydown.left="moveLeft"
      @keydown.right="moveRight"
      @keydown.down="moveDown"
      @keydown.up="rotateBlock"
      tabindex="0"
      v-touch:swipe.left="moveLeft"
      v-touch:swipe.right="moveRight"
      v-touch:swipe.down="moveDown"
      v-touch:tap="rotateBlock"
    >
      <panel :bus="busPanel" :rowSize="getNumRows" :colSize="getNumCols" :player="0" class="panel"></panel>
      <panel
        v-if="isMultiplayer"
        :bus="busPanel"
        :rowSize="getNumRows"
        :colSize="getNumCols"
        :player="1"
        class="panel"
      ></panel>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";

import constants from "../../const";
import Panel from "../organisms/Panel.vue";
import PlayerSelect from "../organisms/PlayerSelect.vue";

export default {
  name: "game",
  data: () => {
    return {
      gameOver: false,
      busPanel: new Vue()
    };
  },
  components: {
    Panel,
    PlayerSelect
  },
  computed: {
    ...mapGetters({
      getNumRows: "panelConfig/getNumRows",
      getNumCols: "panelConfig/getNumCols",
      getBlockPos: "player/getBlockPos",
      getBlockShape: "player/getBlockShape",
      getCurBlockRot: "player/getCurBlockRot",
      isMultiplayer: "player/isMultiplayerMode",
      getGroundState: "ground/getGroundState"
    })
  },
  methods: {
    ...mapActions({
      setBlockShape: "player/setBlockShape",
      setBlockPos: "player/setBlockPos",
      setCurBlockRot: "player/setCurBlockRot",
      addShapeToGround: "ground/addShapeToGround",
      updateBlockPositions: "player/updateBlockPositions",
      updateGroundState: "ground/updateGroundState",
      clearRows: "ground/clearRows"
    }),
    moveLeft() {
      if (this.checkIfTouchWallsOrGround(0, -1)) {
        return;
      }
      this.setBlockPos({
        x: this.getBlockPos(0).x - 1,
        y: this.getBlockPos(0).y,
        player: 0
      });
      this.busPanel.$emit("render");
    },
    moveRight() {
      if (this.checkIfTouchWallsOrGround(0, 1)) {
        return;
      }
      this.setBlockPos({
        x: this.getBlockPos(0).x + 1,
        y: this.getBlockPos(0).y,
        player: 0
      });
      this.busPanel.$emit("render");
    },
    moveDown() {
      if (this.checkIfTouchWallsOrGround(1, 0)) {
        return;
      }
      this.setBlockPos({
        x: this.getBlockPos(0).x,
        y: this.getBlockPos(0).y + 1,
        player: 0
      });
      this.busPanel.$emit("render");
    },
    rotateBlock() {
      const nextRotIdx =
        (this.getCurBlockRot(0) + 1) %
        constants.blockType[this.getBlockShape(0)].length;
      if (this.checkIfTouchWallsOrGround(0, 0, nextRotIdx)) {
        if (!this.checkIfTouchWallsOrGround(0, 1, nextRotIdx)) {
          this.setBlockPos({
            x: this.getBlockPos(0).x + 1,
            y: this.getBlockPos(0).y,
            player: 0
          });
        } else if (!this.checkIfTouchWallsOrGround(0, -1, nextRotIdx)) {
          this.setBlockPos({
            x: this.getBlockPos(0).x - 1,
            y: this.getBlockPos(0).y,
            player: 0
          });
        } else {
          return;
        }
      }
      this.setCurBlockRot({
        rotIndex: nextRotIdx,
        player: 0
      });
      this.busPanel.$emit("render");
    },
    getCurrentBlockPosition(blockRotation = this.getCurBlockRot(0)) {
      var currentBlockPositions = [];
      for (let blockPosValues of constants.blockType[this.getBlockShape(0)][
        blockRotation
      ]) {
        currentBlockPositions.push({
          y: blockPosValues[0] + this.getBlockPos(0).y,
          x: blockPosValues[1] + this.getBlockPos(0).x,
          shape: this.getBlockShape(0)
        });
      }
      return currentBlockPositions;
    },
    checkIfTouchWallsOrGround(
      yMove,
      xMove,
      blockRotation = this.getCurBlockRot(0)
    ) {
      var blocks = this.getCurrentBlockPosition(blockRotation);
      for (let block of blocks) {
        if (
          this.getGroundState(0)[block.y + yMove] &&
          this.getGroundState(0)[block.y + yMove][block.x + xMove]
        ) {
          return true;
        }
        if (block.y + yMove >= this.getNumRows) {
          return true;
        }
        if (block.x + xMove >= this.getNumCols || block.x + xMove < 0) {
          return true;
        }
      }
      return false;
    },
    dropBlock() {
      return {
        x: this.getBlockPos(0).x,
        y: this.getBlockPos(0).y + 1,
        player: 0
      };
    },
    tick() {
      if (this.gameOver) {
        return;
      }
      if (this.checkIfTouchWallsOrGround(1, 0)) {
        this.addShapeToGround({
          blocks: this.getCurrentBlockPosition(),
          player: 0
        });
        this.clearRows({
          player: 0
        });
        this.setBlockShape({
          blockType: _.sample(Object.keys(constants.blockType)),
          player: 0
        });
        this.setBlockPos({
          x: 4,
          y: 1,
          player: 0
        });
        this.setCurBlockRot({
          rotIndex: 0,
          player: 0
        });
      } else {
        this.setBlockPos(this.dropBlock());
      }
      this.busPanel.$emit("render");
      if (
        this.isMultiplayer &&
        (this.getGroundState(1)[0][5] || this.getGroundState(1)[0][4])
      ) {
        window.alert("You Win!");
        this.gameOver = true;
      }
      if (this.getGroundState(0)[0][5] || this.getGroundState(0)[0][4]) {
        window.alert("You Lose!");
        this.gameOver = true;
      }
    },
    startGame() {
      var self = this;
      self.setBlockDrop = setInterval(this.tick, 500);
      if (this.isMultiplayer) {
        self.setMultiplayerUpdate = setInterval(function() {
          self.updateBlockPositions({ player: 1 }),
            self.updateGroundState({ player: 1 });
        }, 30);
      }
    }
  },
  created() {
    this.setBlockShape({
      blockType: _.sample(Object.keys(constants.blockType)),
      player: 0
    });
    window.addEventListener(
      "keydown",
      function(e) {
        // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
        }
      },
      false
    );
  }
};
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
@media screen and (min-width: 960px) {
  .game-box {
    position: relative;
    /* width: 200px; */
    display: flex;
    justify-content: flex-start;
  }
}
@media screen and (max-width: 959px) {
  .game-box {
    position: relative;
    height: 100%;
    width: 100%;
    /* width: 200px; */
    /* display: flex; */
    /* justify-content: flex-start; */
  }
}
</style>
