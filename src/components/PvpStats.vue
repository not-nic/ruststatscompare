<script lang="ts">
import {defineComponent} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";

export default defineComponent({
  name: "PvpStats",

  data() {
    return {
      statStore: useStatStore(),
      showStat: true
    }
  },

  props: {
    kills: {
      type:  Number,
      required: true
    },
    deaths: {
      type:  Number,
      required: true
    },
    bulletsFired: {
      type:  Number,
      required: true
    },
    bulletsHitPlayer: {
      type:  Number,
      required: true
    },
    headshot: {
      type:  Number,
      required: true
    },
  },

  computed: {
    stats() {
      const statStore = useStatStore();
      return [
        {
          name: 'Kills',
          value: this.kills, highlight: statStore.compareStats('kill_player') === this.kills,
          difference: statStore.compareStats('kill_player') - this.kills,
        },
        {
          name: 'Deaths',
          value: this.deaths, highlight: statStore.compareStats('deaths', true) === this.deaths,
          difference: statStore.compareStats('deaths', true) - this.deaths,
        },
        {
          name: 'Bullets Fired',
          value: this.bulletsFired, highlight: statStore.compareStats('bullet_fired') === this.bulletsFired,
          difference: statStore.compareStats('bullet_fired') - this.bulletsFired,
        },
        {
          name: 'Bullets Hit',
          value: this.bulletsHitPlayer, highlight: statStore.compareStats('bullet_hit_player') === this.bulletsHitPlayer,
          difference: statStore.compareStats('bullet_hit_player') - this.bulletsHitPlayer,
        },
        {
          name: 'Headshots',
          value: this.headshot, highlight: statStore.compareStats('headshot') === this.headshot,
          difference: statStore.compareStats('headshot') - this.headshot,
        },
      ];
    },
  },

  methods: {
    calculateKD() {
      return (this.kills / this.deaths).toFixed(2)
    },

    calculateHits(): string {
      return `${((this.bulletsHitPlayer / this.bulletsFired) * 100).toFixed(2)}%`;
    },

    calculateHeadshots(): string {
      return `${((this.headshot / this.bulletsHitPlayer) * 100).toFixed(2)}%`;
    }
  }
})
</script>

<template>
    <div class="head">
      <div class="title">
        <img src="../assets/p2.svg" alt="p2 icon">
        <span>PvP Stats</span>
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
          <div class="group">
            <span class="key" v-if="stat.difference != 0">Diff:</span>
            <span class="value difference" v-if="stat.difference < 0">+{{ stat.difference.toLocaleString('en-gb').substring(1) }}</span>
            <span class="value difference" v-else-if="stat.difference != 0">-{{ stat.difference.toLocaleString('en-gb') }}</span>
          </div>
        </div>
        <div class="stat">
          <span class="key">K/D Ratio:</span>
          <span class="value">{{ calculateKD() }}</span>
        </div>
        <div class="stat">
          <span class="key">Bullets Hit Percentage:</span>
          <span class="value">{{ calculateHits()}}</span>
        </div>
        <div class="stat">
          <span class="key">Headshot Percentage:</span>
          <span class="value">{{ calculateHeadshots()}}</span>
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

.title {
  display: flex;
  align-items: center;
  gap: 10px;
}

img {
  max-width: 15px;
  padding: 5px;
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

.stats {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.stat {
  display: flex;
  padding: 5px;
  justify-content: space-between;
}

.group {
  display: flex;
  gap: 5px;
  align-items: center;
}

.difference {
  color: rgba(205, 43, 43, 0.6);
}
</style>