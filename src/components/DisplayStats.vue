<script lang="ts">
import {defineComponent} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";
import UserProfile from "./UserProfile.vue";
import StatViewer from "./StatViewer.vue";

export default defineComponent({
  name: "DisplayStats",
  components: {UserProfile, StatViewer},

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
      <stat-viewer
          title="PvP Stats"
          type="pvp"
          icon="./src/assets/pvp.svg"
          :index="index"
          :stat-data="[
              {name: 'Kills', key: 'kill_player'},
              {name: 'Deaths', key: 'deaths'},
              {name: 'Bullets Fired', key: 'bullet_fired'},
              {name: 'Bullets Hit', key: 'bullet_hit_player'},
              {name: 'Headshots', key: 'headshot'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Farming Stats"
          type="farming"
          icon="./src/assets/pickaxe.svg"
          :index="index"
          :stat-data="[
              {name: 'Stone Mined', key: 'stones'},
              {name: 'Metal Mined', key: 'acquired_metal.ore'},
              {name: 'Wood Harvested', key: 'wood'},
              {name: 'Cloth Picked', key: 'cloth'},
              {name: 'Low Grade Fuel Crafted', key: 'acquired_lowgradefuel'},
              {name: 'Leather Collected', key: 'harvested_leather'},
              {name: 'Barrels Destroyed', key: 'destroyed_barrels'},
              {name: 'Scrap Collected', key: 'acquired_scrap'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Building Stats"
          type="building"
          icon="../src/assets/building.svg"
          :index="index"
          :stat-data="[
              {name: 'Blocks Placed', key: 'placed_blocks'},
              {name: 'Blocks Upgraded', key: 'upgraded_blocks',},
          ]"
      ></stat-viewer>
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