<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapActions({setWidth : 'window/setWidth'
    }),
    setWindowWidth: debounce(function () {
      this.setWidth(window.innerWidth)
    }, 0.01)
  },
  created () {
    this.setWidth(window.innerWidth)
    window.addEventListener('resize', this.setWindowWidth, false)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.setWindowWidth, false)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  height: 100%;
  width: 100%;
  overscroll-behavior-y: contain;
}
</style>
