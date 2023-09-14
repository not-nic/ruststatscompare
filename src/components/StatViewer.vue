<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";
import Exposure from "./Exposure.vue";
import Pvp from "./Pvp.vue";

export default defineComponent({
  name: "StatViewer",
  components: {Pvp, Exposure},

  props: {
    title: String,
    icon: String,
    index: {
      type: Number,
      required: true
    },
    type: String,
    statData: {
      type: Array as () => Array<{
        name: string,
        lowest: boolean,
        key: string,
      }>,
      required: true
    }
  },

  setup(props) {
    const store = useStatStore();
    const showStat = ref(false);

    /**
     * Find the difference between the current stat, and the highest stat found within the store.
     * @param key - The key of the stat.
     * @param lowest - Whether the stat is the lowest value (optional).
     * @param value - The stat value to compare.
     * @returns The difference between the compared stat and the provided value.
     */
    const difference = (key: string, lowest: boolean | undefined, value: number | undefined) =>
        store.compareStats(key, lowest) - (value || 0);

    /**
     * Check if the current user stat is the highest in the steam stat store.
     * @param key - The key of the stat.
     * @param lowest - Whether the stat is the lowest value (optional).
     * @param value - The stat value to compare.
     * @returns Check if both stats are the same to determine if the current user has the highest stat.
     */
    const highlight = (key: string, lowest: boolean, value: number | undefined) =>
        store.compareStats(key, lowest) === (value || 0);

    const value = (key: string) => store.getStatByKey(store.userSteamStats, <number>props.index, key);

    return {
      store,
      showStat,
      difference,
      highlight,
      value,
    };
  },

  methods: {
    /**
     * Format a stat value as a string.
     * @param key - The key of the stat.
     * @returns The formatted stat value string (e.g. 999,999,999).
     */
    formatStat(key: string): string {
      return this.value(key).toLocaleString('en-gb')
    },

    /**
     * Format the difference between a stat value and the highest stat in the store.
     * @param key - The key of the stat.
     * @param lowest - to find the lowest value instead of the highest (optional).
     * @returns The formatted difference string (e.g., "+123" or "-456").
     */
    formatDifference(key: string, lowest?: boolean): string {
      const diff = this.difference(key, lowest, this.value(key));
      return diff < 0
          ? `+${diff.toLocaleString('en-gb').substring(1)}`
          : `-${diff.toLocaleString('en-gb')}`;
    }
  }
})
</script>

<template>
  <div class="static">
    <div class="head">
      <div class="title">
        <img class="icon" :src="icon" alt="Stat icon">
        <span>{{ title }}</span>
      </div>
      <a @click="showStat = !showStat">{{ showStat ? 'Collapse' : 'Expand' }}</a>
    </div>
    <div class="body" v-if="showStat">
      <div class="stats">
        <div class="stat" v-for="stat in statData" :key="stat.key">
          <div class="group">
            <span :class="{'key active': highlight(stat.key, stat.lowest, value(stat.key))}">{{ stat.name }}:</span>
            <span class="value" :class="{ 'green-highlight': highlight(stat.key, stat.lowest, value(stat.key)) }">
              {{ formatStat(stat.key) }}
            </span>
          </div>
          <div class="group" v-if="store.userSteamStats.length != 1">
            <span class="key" v-if="difference(stat.key, stat.lowest, value(stat.key)) != 0 ">Diff:</span>
            <span class="value difference" v-if="difference(stat.key, stat.lowest, value(stat.key)) < 0 ">
              {{ formatDifference(stat.key, stat.lowest)}}
            </span>
            <span class="value difference" v-else-if="difference(stat.key, stat.lowest, value(stat.key)) != 0 ">
              {{ formatDifference(stat.key, stat.lowest )}}
            </span>
          </div>
        </div>
        <div v-if="type == 'pvp'">
          <pvp :index="index"></pvp>
        </div>
        <div v-else-if="type == 'player'">
          <exposure :index="index"></exposure>
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
  gap: 20px
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
</style>