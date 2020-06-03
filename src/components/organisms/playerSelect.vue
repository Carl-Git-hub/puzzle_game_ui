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
              <div>Pick a room name and give the other player the same room name to play.</div>
              <v-spacer></v-spacer>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="roomName" label="Room Name" required></v-text-field>
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
import { mapGetters, mapActions } from 'vuex'
import randomstring from 'randomstring'

export default {
  name: "playerSelect",
  data() {
    return {
      roomName: randomstring.generate(10),
      dialog: true,
      waitForPlayersDialog: false
    };
  },
  computed: {
    ...mapGetters({
      isReadyToStart: 'player/isReadyToStart'
    })
  },
  methods: {
    ...mapActions({
      setMultiplayerMode: 'player/setMultiplayerMode',
      joinRoom: 'player/joinRoom',
      updateRoomStatus: 'player/updateRoomStatus'
    }),
    startGame() {
      this.dialog = false;
      this.$emit("startGame");
    },
    async sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async waitForPlayers() {
      // this.dialog = false;
      this.waitForPlayersDialog = true
      this.setMultiplayerMode(true)
      this.joinRoom(this.roomName)
      while (!this.isReadyToStart) {
        await this.updateRoomStatus(this.roomName)
        await this.sleep(50);
      }
      this.waitForPlayersDialog = false
      this.dialog = false
      this.$emit("startGame");
    }
  }
};
</script>
