<script lang="ts">
import {defineComponent} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";

export default defineComponent({
  name: "StatViewer",

  data() {
    return {
      store: useStatStore(),
      showStat: true
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    statData: {
      type: Array as () => Array<{
        name: string,
        key: string,
      }>,
      required: true
    }
  },

  methods: {
    difference(key: string, value: number) {
      return this.store.compareStats(key) - value;
    },
    highlight(key: string, value: number) {
      return this.store.compareStats(key) === value;
    },
    value(index: number, key: string) {
      return this.store.getStatByKey(this.store.userSteamStats, this.index, key)
    },

    calculateKD(kills: number, deaths: number): string {
      return (kills / deaths).toFixed(2)
    },

    calculateHits(bulletHit: number, bulletFired: number): string {
      return `${(bulletHit / bulletFired * 100).toFixed(2)}%`;
    },

    calculateHeadshots(headshots: number, bulletsHit: number): string {
      return `${(headshots / bulletsHit * 100).toFixed(2)}%`;
    }
  },

  computed: {
    computedValue() {
      return (key) => {
        return this.value(this.index, key)
      }
    }
  }
})
</script>

<template>
  <div class="static">
    <div class="head">
      <div class="title">
        <img class="icon" :src="icon" alt="Farming icon">
        <span>{{title}}</span>
      </div>
      <a v-if="showStat" @click="showStat = false">Collapse</a>
      <a v-else @click="showStat = true">Expand</a>
    </div>
    <div v-if="showStat" class="body">
      <div class="stats">
        <div class="stat" v-for="stat in statData" :key="stat.name">
          <div class="group">
            <span v-if="highlight(stat.key, computedValue(stat.key))" class="key active">{{ stat.name }}:</span>
            <span v-else class="key">{{ stat.name }}:</span>
            <span class="value" :class="{ 'green-highlight': highlight(stat.key, computedValue(stat.key)) }">
              {{ computedValue(stat.key).toLocaleString('en-gb') }}
            </span>
          </div>
          <div class="group">
            <span class="key" v-if="difference(stat.key, computedValue(stat.key)) != 0">Diff:</span>
            <span class="value difference" v-if="difference(stat.key, computedValue(stat.key))< 0">
              +{{ difference(stat.key, computedValue(stat.key)).toLocaleString('en-gb').substring(1) }}
            </span>
            <span class="value difference" v-else-if="difference(stat.key, computedValue(stat.key))!= 0">
              -{{ difference(stat.key, computedValue(stat.key)).toLocaleString('en-gb') }}
            </span>
          </div>
        </div>
        <div v-if="type == 'pvp'" class="additional">
          <div class="stat">
            <span class="key">K/D Ratio:</span>
            <span class="value">
              {{ calculateKD(computedValue('kill_player'), computedValue('deaths')) }}
            </span>
          </div>
          <div class="stat">
            <span class="key">Bullets Hit Percentage:</span>
            <span class="value">
              {{ calculateHits(computedValue('bullet_hit_player'), computedValue('bullet_fired'))}}
            </span>
          </div>
          <div class="stat">
            <span class="key">Headshot Percentage:</span>
            <span class="value">
              {{ calculateHeadshots(computedValue('headshot'),computedValue('bullet_hit_player'))}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px 5px 15px;
  font-family: 'Roboto Condensed', sans-serif;
  background-color: #2a2a2a;
  border-radius: 5px 5px 0 0;
}

.body {
  display: flex;
  align-content: center;
  align-items: start;
  gap: 15px;
  padding: 10px;
  font-family: 'Roboto Condensed', sans-serif;
  background-color: #212121;
  border-radius: 0 0 5px 5px;
}

.icon {
  max-width: 15px;
  padding: 5px;
}

.title {
  display: flex;
  align-items: center;
  gap: 10px;
}

a {
  font-size: 14px;
  cursor: pointer;
}

.green-highlight {
  color: rgba(134, 205, 43, 0.60);
}

.active {
  color: #e2e2e2;
}

.difference {
  color: rgba(205, 43, 43, 0.6);
}

.stat {
  display: flex;
  padding: 5px;
  justify-content: space-between;
  gap: 30px
}

.stats {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.group {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.additional {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>