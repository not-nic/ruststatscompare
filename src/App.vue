<script lang="ts">
import {defineComponent} from 'vue'
import getStats from "./components/GetStats.vue";
import {useStatStore} from "./stores/StatStore.ts";
import DisplayStats from "./components/DisplayStats.vue";

export default defineComponent({
  name: "App",

  components: {
    DisplayStats,
    getStats
  },

  mounted() {
    console.log(this.statStore.getPlayerName("76561198818648238"))
  },

  data() {
    return {
      statStore: useStatStore(),
    }
  }
})
</script>

<template>
  <div class="container">
    <h1>Rust Stats</h1>
    <get-stats></get-stats>
    <div class="content">
      <display-stats></display-stats>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  padding: 20px;
}
</style>
