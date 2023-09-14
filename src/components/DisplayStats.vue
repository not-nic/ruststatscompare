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
          icon="/images/pvp.svg"
          :index="index"
          :stat-data="[
              {name: 'Kills', lowest: false, key: 'kill_player'},
              {name: 'Deaths', lowest: true, key: 'deaths'},
              {name: 'Bullets Fired', lowest: false, key: 'bullet_fired'},
              {name: 'Rockets Fired', lowest: false, key: 'rocket_fired'},
              {name: 'Bullets Hit', lowest: false, key: 'bullet_hit_player'},
              {name: 'Headshots', lowest: false, key: 'headshot'},
              {name: 'Melee Strikes', lowest: false, key: 'melee_strikes'},
              {name: 'Weapons Thrown', lowest: false, key: 'melee_thrown'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Farming Stats"
          type="farming"
          icon="/images/pickaxe.svg"
          :index="index"
          :stat-data="[
              {name: 'Stone Mined', lowest: false, key: 'stones'},
              {name: 'Metal Mined', lowest: false, key: 'acquired_metal.ore'},
              {name: 'Wood Harvested', lowest: false, key: 'wood'},
              {name: 'Cloth Picked', lowest: false, key: 'cloth'},
              {name: 'Low Grade Fuel Crafted', lowest: false, key: 'acquired_lowgradefuel'},
              {name: 'Leather Collected', lowest: false,  key: 'harvested_leather'},
              {name: 'Barrels Destroyed', lowest: false,  key: 'destroyed_barrels'},
              {name: 'Scrap Collected', lowest: false,  key: 'acquired_scrap'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Player Stats"
          type="player"
          icon="/images/player.svg"
          :index="index"
          :stat-data="[
              {name: 'Calories', lowest: false,  key: 'calories_consumed'},
              {name: 'Water Drunk', lowest: false,  key: 'water_consumed'},
              {name: 'Distance Ridden', lowest: false,  key: 'horse_distance_ridden'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Building Stats"
          type="building"
          icon="/images/building.svg"
          :index="index"
          :stat-data="[
              {name: 'Blocks Placed', lowest: false,  key: 'placed_blocks'},
              {name: 'Blocks Upgraded', lowest: false,  key: 'upgraded_blocks'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Bullet Breakdown"
          type="bullets"
          icon="/images/bullet.svg"
          :index="index"
          :stat-data="[
              {name: 'Players Hit', lowest: false,  key: 'bullet_hit_player'},
              {name: 'Building Hit', lowest: false,  key: 'bullet_hit_building'},
              {name: 'Signs Hit', lowest: false,  key: 'bullet_hit_sign'},
              {name: 'Bears Hit', lowest: false,  key: 'bullet_hit_bear'},
              {name: 'Boars Hit', lowest: false,  key: 'bullet_hit_boar'},
              {name: 'Wolves Hit', lowest: false,  key: 'bullet_hit_wolf'},
              {name: 'Deer Hit', lowest: false,  key: 'bullet_hit_stag'},
              {name: 'Horses Hit', lowest: false,  key: 'bullet_hit_horse'},
              {name: 'Corpses Hit', lowest: false,  key: 'corpses'},
              {name: 'Other', lowest: false,  key: 'bullet_hit_entity'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Bow Breakdown"
          type="bullets"
          icon="/images/bow.svg"
          :index="index"
          :stat-data="[
              {name: 'Arrows Fired', lowest: false,  key: 'arrow_fired'},
              {name: 'Players Hit', lowest: false,  key: 'arrow_hit_player'},
              {name: 'Building Hit', lowest: false,  key: 'arrow_hit_building'},
              {name: 'Bears Hit', lowest: false,  key: 'arrow_hit_bear'},
              {name: 'Boars Hit', lowest: false,  key: 'arrow_hit_boar'},
              {name: 'Wolves Hit', lowest: false,  key: 'arrow_hit_wolf'},
              {name: 'Deer Hit', lowest: false,  key: 'arrow_hit_stag'},
              {name: 'Horses Hit', lowest: false,  key: 'arrow_hit_horse'},
              {name: 'Chickens Hit', lowest: false,  key: 'arrow_hit_chicken'},
              {name: 'Other', lowest: false,  key: 'arrow_hit_entity'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Shotgun Stats"
          type="shotgun"
          icon="/images/shotgun.svg"
          :index="index"
          :stat-data="[
              {name: 'Shots Fired', lowest: false,  key: 'shotgun_fired'},
              {name: 'Players Hit', lowest: false,  key: 'shotgun_hit_player'},
              {name: 'Buildings Hit', lowest: false,  key: 'shotgun_hit_building'},
              {name: 'Other', lowest: false,  key: 'shotgun_hit_entity'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Kills"
          type="kills"
          icon="/images/kills.svg"
          :index="index"
          :stat-data="[
              {name: 'Players', lowest: false,  key: 'kill_player'},
              {name: 'Scientists', lowest: false,  key: 'kill_scientist'},
              {name: 'Bears', lowest: false,  key: 'kill_bear'},
              {name: 'Boars', lowest: false,  key: 'kill_boar'},
              {name: 'Wolves', lowest: false,  key: 'kill_wolf'},
              {name: 'Deer', lowest: false,  key: 'kill_stag'},
              {name: 'Horses', lowest: false,  key: 'kill_horse'},
              {name: 'Chickens', lowest: false,  key: 'kill_chicken'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Deaths"
          type="deaths"
          icon="/images/deaths.svg"
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
          icon="/images/wounds.svg"
          :index="index"
          :stat-data="[
              {name: 'Players Wounded', lowest: false,  key: 'wounded'},
              {name: 'Kill Assists', lowest: false,  key: 'wounded_assisted'},
              {name: 'Get ups', lowest: false,  key: 'wounded_healed'},
          ]"
      ></stat-viewer>
      <stat-viewer
          title="Fun"
          type="game"
          icon="/images/game.svg"
          :index="index"
          :stat-data="[
              {name: 'Inventory Opened', lowest: false,  key: 'INVENTORY_OPENED'},
              {name: 'Crafting Opened', lowest: false,  key: 'CRAFTING_OPENED'},
              {name: 'Map Opened', lowest: false,  key: 'MAP_OPENED'},
              {name: 'TC Refilled', lowest: false,  key: 'CUPBOARD_OPENED'},
              {name: 'Items Dropped', lowest: false,  key: 'item_drop'},
              {name: 'Waves', lowest: false,  key: 'waved_at_players'},
              {name: 'Blueprints studied', lowest: false,  key: 'blueprint_studied'},
              {name: 'Notes Played', lowest: false,  key: 'InstrumentNotesPlayed'},
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