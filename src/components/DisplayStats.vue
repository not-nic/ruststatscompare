<script lang="ts">
import {defineComponent} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";
import UserProfile from "./UserProfile.vue";
import PvpStats from "./PvpStats.vue";

interface Stat {
  name: string;
  value: number;
}

export default defineComponent({
  name: "DisplayStats",
  components: {PvpStats, UserProfile},

  setup() {
    const statStore = useStatStore();

    return {
      statStore,
    };
  },

  methods: {

  }
})
</script>


<template>
  <div class="user" v-for="(userStats, index) in statStore.userSteamStats" :key="index">
    <user-profile
        :index="index"
        :steam-id="userStats.user.steamId"
        :name="userStats.user.name"
        :date-created="userStats.user.dateCreated"
        :avatar-url="userStats.user.avatarUrl"
        :hours="userStats.user.hours"
    ></user-profile>
    <div class="stats">
      <pvp-stats
          :kills="statStore.getStatByKey(statStore.userSteamStats, index, 'kill_player')"
          :deaths="statStore.getStatByKey(statStore.userSteamStats, index, 'deaths')"
          :bullets-fired="statStore.getStatByKey(statStore.userSteamStats, index, 'bullet_fired')"
          :bullets-hit-player="statStore.getStatByKey(statStore.userSteamStats, index, 'bullet_hit_player')"
          :headshot="statStore.getStatByKey(statStore.userSteamStats, index, 'headshot')"
      ></pvp-stats>
    </div>
  </div>
</template>

<style scoped>
.user {
  max-width: 500px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>