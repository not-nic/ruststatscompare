<script lang="ts">
import {defineComponent} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";

export default defineComponent({
  name: "GetStats",

  data() {
    return {
      statStore: useStatStore(),
      steamId: null as string
    }
  }
})
</script>

<template>
  <div>
    <input type="text" v-model="steamId">
    <input type="submit" @click="statStore.getSteamStats(steamId)"/>
  </div>
</template>

<style scoped>

</style>