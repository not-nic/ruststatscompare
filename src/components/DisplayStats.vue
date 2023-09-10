<script lang="ts">
import {defineComponent} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";
import UserProfile from "./UserProfile.vue";

interface Stat {
  name: string;
  value: number;
}

export default defineComponent({
  name: "DisplayStats",
  components: {UserProfile},

  setup() {
    const statStore = useStatStore();

    const isHighestStat = (userStats: any, currentStat: Stat): boolean => {
      // Find the highest 'currentStat' across all users.
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
    <user-profile
        :index="index"
        :steam-id="userStats.user.steamId"
        :name="userStats.user.name"
        :date-created="userStats.user.dateCreated"
        :avatar-url="userStats.user.avatarUrl"
        :hours="userStats.user.hours"
    ></user-profile>
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