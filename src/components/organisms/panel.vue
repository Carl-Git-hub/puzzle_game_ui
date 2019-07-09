<template>
  <div class='panel'>
    <div v-for="row in getNumRows" :key="'cell-row-' + row">
      <div v-for="col in getNumCols" :key="'cell-'+ row + '-' + col">
        <cell class="cell" :posX="col" :posY="row"></cell>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cell from '../atoms/cell.vue'

export default {
  name: 'panel',
  components: {
    cell
  },
  computed: {
      ...mapGetters({
        getNumRows: 'panelConfig/getNumRows',
        getNumCols: 'panelConfig/getNumCols'
      })
  }
}
</script>

<style scoped>
  .panel {
    padding: 10px;
  }
</style>
