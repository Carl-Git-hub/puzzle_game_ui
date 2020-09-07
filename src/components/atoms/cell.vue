<template>
  <div :style="style" :class="colour" class="cell"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Cell',
  data() {
    return {
      shape: "EMPTY"
    }
  },
  props: {
    posY: Number,
    posX: Number,
    bus: Object
  },
  computed: {
      ...mapGetters({
        getCellSize: 'cellConfig/getCellSize'
      }),
      colour () {
        return this.shape
      },
      style () {
        return {
          width: this.getCellSize + 'px',
          height: this.getCellSize + 'px',
          left: this.posX * this.getCellSize + 'px',
          top: this.posY * this.getCellSize + 'px'
        }
      }
    },
  methods: {
    setShape (shape) {
      this.shape = shape
    }
  },
  created() {
    this.bus.$on("setShape", (shape) => this.setShape(shape));
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
  .cell.EMPTY {
    background-color: rgba(200, 200, 200, 0.3);
    border-right-color: rgba(200, 200, 200, 0.3);
    border-bottom-color: rgba(200, 200, 200, 0.3);
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
  .cell.P {
    background-color: magenta;
    border-right-color: magenta;
    border-bottom-color: magenta;
  }
  .cell.H {
    background-color: lime;
    border-right-color: lime;
    border-bottom-color: lime;
  }
</style>
