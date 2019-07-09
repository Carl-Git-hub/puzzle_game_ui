<template>
  <div>
    <panel class="panel"></panel>
  </div>
</template>

<script>
import panel from '../organisms/panel.vue'

export default {
  name: 'tetris',
  components: {
    panel
  },
  created () {

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
