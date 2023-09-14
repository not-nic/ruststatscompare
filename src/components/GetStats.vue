<script lang="ts">
import {defineComponent} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";

export default defineComponent({
  name: "GetStats",

  data() {
    return {
      statStore: useStatStore(),
      steamId: ""
    }
  }
})
</script>

<template>
  <div class="search">
    <div class="input-container">
      <input class="input" type="text" placeholder="Enter a steam profile to compare..." v-model="steamId"/>
      <input class="submit" type="submit" value="Search" disabled v-if="steamId == ''" @click="statStore.getSteamStats(steamId)"/>
      <input class="submit" type="submit" value="Search" v-else @click="statStore.getSteamStats(steamId)"/>
    </div>
  </div>
</template>

<style scoped>
.search {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.input-container {
  min-width: 600px;
  display: flex;
  gap: 10px;
}

input {
  padding: 15px;
  background-color: #2a2a2a;
  border: none;
  outline: none;
  border-radius: 5px;

  font-family: 'Space Mono', monospace;
}

.input {
  flex: 90%;
}

.submit {
  flex: 10%;
}

.submit:hover {
  color: #bc3e2b;
}
</style>