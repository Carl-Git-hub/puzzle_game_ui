<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">Select number of players</v-card-title>
        <v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="startGame">Single Player</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-divider />
          <v-container grid-list-md>
            <v-layout wrap>
              <v-spacer></v-spacer>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Game Name" required></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="waitForPlayers">Multiplayer</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
     <v-dialog v-model="waitForPlayersDialog" persistent max-width="300px">
        <v-card>
          <v-card-title>
            <span>Waiting For Players</span>
          </v-card-title>
        </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "playerSelect",
  data() {
    return {
      dialog: true,
      waitForPlayersDialog: false
    };
  },
  methods: {
    ...mapActions({
      setMultiplayerMode: 'player/setMultiplayerMode'
    }),
    startGame() {
      this.dialog = false;
      this.$emit("startGame");
    },
    waitForPlayers() {
      // this.dialog = false;
      this.waitForPlayersDialog = true
      this.setMultiplayerMode(true)
      // this.$emit("startGame");
    }
  }
};
</script>
