<template>
  <div :style="style" :class="shape" class="cell"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'cell',
  props: {
    shape : String,
    posY: Number,
    posX: Number
  },
  computed: {
      ...mapGetters({
        getCellSize: 'cellConfig/getCellSize'
      }),
      style () {
        return {
          width: this.getCellSize + 'px',
          height: this.getCellSize + 'px',
          left: this.posX * this.getCellSize + 'px',
          top: this.posY * this.getCellSize + 'px'
        }
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cell {
    position: absolute;
    box-sizing: border-box;
    background-color: rgba(200, 200, 200, 0.3);
    border-style: dashed;
    border-width: 1px;
    border-color: rgba(100, 100, 100, 0.3);
    /* border-left-color: rgba(255, 255, 255, 0.3); */
  }
  .cell.I {
    background-color: cyan;
    border-right-color: cyan;
    border-bottom-color: cyan;
  }
  .cell.O {
    background-color: yellow;
    border-right-color: yellow;
    border-bottom-color: yellow;
  }
  .cell.T {
    background-color: magenta;
    border-right-color: magenta;
    border-bottom-color: magenta;
  }
  .cell.S {
    background-color: lime;
    border-right-color: lime;
    border-bottom-color: lime;
  }
  .cell.Z {
    background-color: red;
    border-right-color: red;
    border-bottom-color: red;
  }
  .cell.J {
    background-color: blue;
    border-right-color: blue;
    border-bottom-color: blue;
  }
  .cell.L {
    background-color: orange;
    border-right-color: orange;
    border-bottom-color: orange;
  }
</style>
