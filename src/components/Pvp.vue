<script lang="ts">
import {defineComponent} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";

export default defineComponent({
  name: "Pvp",

  data() {
    return {
      store: useStatStore()
    }
  },

  props: {
    index: {
      type: Number,
      required: true
    }
  },

  methods: {
    /**
     * Get a stat value by its key.
     * @param key - The key of the stat.
     * @returns The value of the stat as a number.
     */
    getStatByKey(key: string): number {
      return this.store.getStatByKey(this.store.userSteamStats, this.index, key)
    },

    /**
     * Calculate the kill/death ratio.
     * @param kills - The number of kills.
     * @param deaths - The number of deaths.
     * @returns The kd ratio as a formatted string.
     */
    calculateKD(kills: number, deaths: number): string {
      return (kills / deaths).toFixed(2)
    },

    /**
     * Calculate hit percentage.
     * @param bulletHit - number of bullets hit.
     * @param bulletFired - number of bullets fired.
     * @returns The hits percentage as a formatted string.
     */
    calculateHits(bulletHit: number, bulletFired: number): string {
      return `${(bulletHit / bulletFired * 100).toFixed(2)}%`;
    },

    /**
     * Calculate headshot percentage.
     * @param headshots - number of headshots.
     * @param bulletsHit - number of bullets that hit players.
     * @returns The headshots percentage as a formatted string.
     */
    calculateHeadshots(headshots: number, bulletsHit: number): string {
      return `${(headshots / bulletsHit * 100).toFixed(2)}%`;
    }
  }
})
</script>

<template>
  <div class="additional">
    <div class="stat">
      <span class="key">K/D Ratio:</span>
      <span class="value">
        {{ calculateKD(getStatByKey('kill_player'), getStatByKey('deaths')) }}
      </span>
    </div>
    <div class="stat">
      <span class="key">Bullets Hit Percentage:</span>
      <span class="value">
        {{ calculateHits(getStatByKey('bullet_hit_player'), getStatByKey('bullet_fired'))}}
      </span>
    </div>
    <div class="stat">
      <span class="key">Headshot Percentage:</span>
      <span class="value">
        {{ calculateHeadshots(getStatByKey('headshot'),getStatByKey('bullet_hit_player'))}}
      </span>
    </div>
  </div>
</template>

<style scoped>
.stat {
  display: flex;
  padding: 5px;
  justify-content: space-between;
  gap: 30px
}

.additional {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>