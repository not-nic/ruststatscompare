<script lang="ts">
import {defineComponent} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";

interface Stat {
  name: string;
  value: number;
}

export default defineComponent({
  name: "DisplayStats",

  setup() {
    const statStore = useStatStore();

    const isHighestStat = (userStats: any, currentStat: Stat): boolean => {
      const highestValueForStat = Math.max(...statStore.userSteamStats.flatMap(userStats => userStats.stats
          .filter(stat => stat.name === currentStat.name)
          .map(stat => stat.value)
      ));
      return currentStat.value === highestValueForStat;
    };
    return {
      statStore,
      isHighestStat,
    };
  },

  mounted() {
    console.log(this.statStore.userSteamStats)
  },

  methods: {

  }
})
</script>

<template>
  <div v-for="(userStats, index) in statStore.userSteamStats" :key="index">
    <h2>{{ userStats.user }}</h2>
    <div class="stats">
      <div v-for="(stat, statIndex) in userStats.stats" :key="statIndex" :class="{'green-background': isHighestStat(userStats, stat)}">
        <span>{{ stat.name }}: {{ stat.value }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.green-background {
  color: green;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>