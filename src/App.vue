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

  },

  data() {
    return {
      statStore: useStatStore(),
    }
  },
})
</script>

<template>
  <div class="container">
    <div class="header">
      <img src="/logo.svg" alt="Rust Logo" draggable="false">
    </div>
    <div class="main">
      <get-stats></get-stats>
      <div class="content">
        <display-stats></display-stats>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 10px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
}

img {
  max-width: 250px;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
}
</style>
