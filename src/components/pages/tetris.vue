<template>
  <div>
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
      getNumCols: "panelConfig/getNumCols"
    })
  },
  methods: {
    ...mapActions({
      setBlockShape: 'player/setBlockShape',
      setBlockPos: 'player/setBlockPos'
    })
  },
  created () {
    this.setBlockShape(_.sample(Object.keys(constants.blockType)))
  },
  mounted() {
    this.busPanel.$emit('render')
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

.panel {
  width: 400px;
  height: 600px;
}
</style>
