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

    return {
      statStore,
    };
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