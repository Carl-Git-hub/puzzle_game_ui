<template>
  <div class="panel">
    <div v-for="row in rowSize" :key="'cell-row-' + row">
      <div v-for="col in colSize" :key="'cell-'+ row + '-' + col">
        <cell :bus="cellPanelsBus[row - 1][col - 1]" class="cell" :posX="col" :posY="row"></cell>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from 'vuex'

import cell from "../atoms/cell.vue"
import constants from '../../const'

export default {
  name: "panel",
  props: {
    bus: Object,
    rowSize: Number,
    colSize: Number,
    player: Number
  },
  computed: {
    ...mapGetters({
      getBlockPos: "player/getBlockPos",
      getBlockShape: "player/getBlockShape",
      getCurBlockRot: "player/getCurBlockRot",
      getGroundState: "ground/getGroundState"
    })
  },
  components: {
    cell
  },
  data() {
    var cellPanels = []
    for (let y = 0; y < 18; y++) {
      cellPanels[y] = [];
      for (let x = 0; x < 10; x++) {
        cellPanels[y][x] = new Vue();
      }
    }
    return {
      cellPanelsBus: cellPanels
    }
  },
  methods: {
    isPartOfPlayerBlock (x, y) {
      for (let blockPosValues of constants.blockType[this.getBlockShape(this.player)][this.getCurBlockRot(this.player)]) {
        if ((blockPosValues[0] + this.getBlockPos(this.player).y) === y && (blockPosValues[1] + this.getBlockPos(this.player).x) === x) {
          return true
        }
      }
      return false
    },
    render() {
      for (let y = 0; y < this.rowSize; y++) {
        for (let x = 0; x < this.colSize; x++) {
          if (this.isPartOfPlayerBlock(x, y)) {
            this.cellPanelsBus[y][x].$emit("setShape", this.getBlockShape(this.player));
          } else if (this.getGroundState[y] && this.getGroundState[y][x]) {
            this.cellPanelsBus[y][x].$emit("setShape", this.getGroundState[y][x]);
          } else {
            this.cellPanelsBus[y][x].$emit("setShape", "EMPTY");
          }
        }
      }
    }
  },
  created() {
    this.bus.$on("render", this.render);
  }
};
</script>

<style scoped>
.panel {
  padding: 10px;
}
</style>
