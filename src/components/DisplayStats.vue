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
              {name: 'Deaths', lowest: true, key: 'deaths'},
              {name: 'Bullets Fired', key: 'bullet_fired'},
              {name: 'Rockets Fired', key: 'rocket_fired'},
              {name: 'Bullets Hit', key: 'bullet_hit_player'},
              {name: 'Headshots', key: 'headshot'},
              {name: 'Melee Strikes', key: 'melee_strikes'},
              {name: 'Weapons Thrown', key: 'melee_thrown'},
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
          title="Player Stats"
          type="player"
          icon="../src/assets/player.svg"
          :index="index"
          :stat-data="[
              {name: 'Calories', key: 'calories_consumed'},
              {name: 'Water Drunk', key: 'water_consumed'},
              {name: 'Distance Ridden', key: 'horse_distance_ridden'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Building Stats"
          type="building"
          icon="../src/assets/building.svg"
          :index="index"
          :stat-data="[
              {name: 'Blocks Placed', key: 'placed_blocks'},
              {name: 'Blocks Upgraded', key: 'upgraded_blocks'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Bullet Breakdown"
          type="bullets"
          icon="../src/assets/bullet.svg"
          :index="index"
          :stat-data="[
              {name: 'Players Hit', key: 'bullet_hit_player'},
              {name: 'Building Hit', key: 'bullet_hit_building'},
              {name: 'Signs Hit', key: 'bullet_hit_sign'},
              {name: 'Bears Hit', key: 'bullet_hit_bear'},
              {name: 'Boars Hit', key: 'bullet_hit_boar'},
              {name: 'Wolves Hit', key: 'bullet_hit_wolf'},
              {name: 'Deer Hit', key: 'bullet_hit_stag'},
              {name: 'Horses Hit', key: 'bullet_hit_horse'},
              {name: 'Corpses Hit', key: 'corpses'},
              {name: 'Other', key: 'bullet_hit_entity'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Bow Breakdown"
          type="bullets"
          icon="../src/assets/bow.svg"
          :index="index"
          :stat-data="[
              {name: 'Arrows Fired', key: 'arrow_fired'},
              {name: 'Players Hit', key: 'arrow_hit_player'},
              {name: 'Building Hit', key: 'arrow_hit_building'},
              {name: 'Bears Hit', key: 'arrow_hit_bear'},
              {name: 'Boars Hit', key: 'arrow_hit_boar'},
              {name: 'Wolves Hit', key: 'arrow_hit_wolf'},
              {name: 'Deer Hit', key: 'arrow_hit_stag'},
              {name: 'Horses Hit', key: 'arrow_hit_horse'},
              {name: 'Chickens Hit', key: 'arrow_hit_chicken'},
              {name: 'Other', key: 'arrow_hit_entity'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Shotgun Stats"
          type="shotgun"
          icon="../src/assets/shotgun.svg"
          :index="index"
          :stat-data="[
              {name: 'Shots Fired', key: 'shotgun_fired'},
              {name: 'Players Hit', key: 'shotgun_hit_player'},
              {name: 'Buildings Hit', key: 'shotgun_hit_building'},
              {name: 'Other', key: 'shotgun_hit_entity'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Kills"
          type="kills"
          icon="../src/assets/kills.svg"
          :index="index"
          :stat-data="[
              {name: 'Players', key: 'kill_player'},
              {name: 'Scientists', key: 'kill_scientist'},
              {name: 'Bears', key: 'kill_bear'},
              {name: 'Boars', key: 'kill_boar'},
              {name: 'Wolves', key: 'kill_wolf'},
              {name: 'Deer', key: 'kill_stag'},
              {name: 'Horses', key: 'kill_horse'},
              {name: 'Chickens', key: 'kill_chicken'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Deaths"
          type="deaths"
          icon="../src/assets/deaths.svg"
          :index="index"
          :stat-data="[
              {name: 'Total Deaths', lowest: true, key: 'deaths'},
              {name: 'Self Deletes', lowest: true, key: 'death_suicide'},
              {name: 'Falling', lowest: true, key:  'death_fall'},
              {name: 'Wolves', lowest: true, key: 'death_wolf'},
              {name: 'Bears', lowest: true, key: 'death_bear'},
              {name: 'Other', lowest: true, key: 'death_entity'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Wounds"
          type="wounds"
          icon="../src/assets/wounds.svg"
          :index="index"
          :stat-data="[
              {name: 'Players Wounded', key: 'wounded'},
              {name: 'Kill Assists', key: 'wounded_assisted'},
              {name: 'Get ups', key: 'wounded_healed'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Fun"
          type="game"
          icon="../src/assets/game.svg"
          :index="index"
          :stat-data="[
              {name: 'Inventory Opened', key: 'INVENTORY_OPENED'},
              {name: 'Crafting Opened', key: 'CRAFTING_OPENED'},
              {name: 'Map Opened', key: 'MAP_OPENED'},
              {name: 'TC Refilled', key: 'CUPBOARD_OPENED'},
              {name: 'Items Dropped', key: 'item_drop'},
              {name: 'Waves', key: 'waved_at_players'},
              {name: 'Blueprints studied', key: 'blueprint_studied'},
              {name: 'Notes Played', key: 'InstrumentNotesPlayed'},
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