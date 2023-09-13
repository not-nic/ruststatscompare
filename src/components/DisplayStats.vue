<script lang="ts">
import {defineComponent} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";
import UserProfile from "./UserProfile.vue";
import PvpStats from "./PvpStats.vue";
import FarmingStats from "./FarmingStats.vue";

export default defineComponent({
  name: "DisplayStats",
  components: {FarmingStats,PvpStats, UserProfile},

  data() {
    return {
      store: useStatStore().userSteamStats,
    }
  },

  setup() {
    const statStore = useStatStore();
    return {
      statStore,
    };
  },
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
          :kills="statStore.getStatByKey(store, index, 'kill_player')"
          :deaths="statStore.getStatByKey(store, index, 'deaths')"
          :bullets-fired="statStore.getStatByKey(store, index, 'bullet_fired')"
          :bullets-hit-player="statStore.getStatByKey(store, index, 'bullet_hit_player')"
          :headshot="statStore.getStatByKey(store, index, 'headshot')"
      ></pvp-stats>
      <farming-stats
          :scrap="statStore.getStatByKey(store, index, 'acquired_scrap')"
          :barrels="statStore.getStatByKey(store, index, 'destroyed_barrels')"
          :leather="statStore.getStatByKey(store, index, 'harvested_leather')"
          :lgf="statStore.getStatByKey(store, index, 'acquired_lowgradefuel')"
          :cloth="statStore.getStatByKey(store, index, 'cloth')"
          :wood="statStore.getStatByKey(store, index, 'wood')"
          :metal="statStore.getStatByKey(store, index, 'acquired_metal.ore')"
          :stones="statStore.getStatByKey(store, index, 'stones')"
      ></farming-stats>
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

.stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>