<script lang="ts">
import {defineComponent} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";

export default defineComponent({
  name: "FarmingStats",

  data() {
    return {
      showStat: true
    }
  },

  props: {
    stones: {
      type: Number,
      required: true
    },
    metal: {
      type: Number,
      required: true
    },
    wood: {
      type: Number,
      required: true
    },
    cloth: {
      type: Number,
      required: true
    },
    lgf: {
      type: Number,
      required: true
    },
    leather: {
      type: Number,
      required: true
    },
    barrels: {
      type: Number,
      required: true
    },
    scrap: {
      type: Number,
      required: true
    }
  },

  computed: {
    stats() {
      const statStore = useStatStore();
      return [
        {
          name: 'Stone Mined',
          value: this.stones,
          highlight: statStore.compareStats('stones') === this.stones,
          difference: statStore.compareStats('stones') - this.stones
        },
        {
          name: 'Metal Mined',
          value: this.metal,
          highlight: statStore.compareStats('acquired_metal.ore') === this.metal,
          difference: statStore.compareStats('acquired_metal.ore') - this.metal
        },
        {
          name: 'Wood Harvested',
          value: this.wood,
          highlight: statStore.compareStats('wood') === this.wood,
          difference: statStore.compareStats('wood') - this.wood
        },
        {
          name: 'Cloth Picked',
          value: this.cloth,
          highlight: statStore.compareStats('cloth') === this.cloth,
          difference: statStore.compareStats('cloth') - this.cloth
        },
        {
          name: 'Low Grade Fuel Crafted',
          value: this.lgf,
          highlight: statStore.compareStats('acquired_lowgradefuel') === this.lgf,
          difference: statStore.compareStats('acquired_lowgradefuel') - this.lgf
        },
        {
          name: 'Leather Collected',
          value: this.leather,
          highlight: statStore.compareStats('harvested_leather') === this.leather,
          difference: statStore.compareStats('harvested_leather') - this.leather
        },
        {
          name: 'Barrels Destroyed',
          value: this.barrels,
          highlight: statStore.compareStats('destroyed_barrels') === this.barrels,
          difference: statStore.compareStats('destroyed_barrels') - this.barrels
        },
        {
          name: 'Scrap Collected',
          value: this.scrap,
          highlight: statStore.compareStats('acquired_scrap') === this.scrap,
          difference: statStore.compareStats('acquired_scrap') - this.scrap
        },
      ]
    }
  }
})
</script>

<template>
  <div class="farming">
    <div class="head">
      <div class="title">
        <img class="icon" src="../assets/pickaxe.svg" alt="Farming icon">
        <span>Farming Stats</span>
      </div>
      <a v-if="showStat" @click="showStat = false">Collapse</a>
      <a v-else @click="showStat = true">Expand</a>
    </div>
    <div v-if="showStat" class="body">
      <div class="stats">
        <div class="stat" v-for="stat in stats" :key="stat.name">
          <div class="group">
            <span v-if="stat.highlight" class="key active">{{ stat.name }}:</span>
            <span v-else class="key">{{ stat.name }}:</span>
            <span class="value" :class="{ 'green-highlight': stat.highlight }">{{ stat.value.toLocaleString('en-gb') }}</span>
          </div>
          <div v-if="stat.difference != 0" class="group">
            <span class="key" v-if="stat.difference != 0">Diff:</span>
            <span class="value difference" v-if="stat.difference < 0">+{{ stat.difference.toLocaleString('en-gb').substring(1) }}</span>
            <span class="value difference" v-else-if="stat.difference != 0">-{{ stat.difference.toLocaleString('en-gb') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>