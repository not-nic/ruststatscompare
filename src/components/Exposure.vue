<script lang="ts">
import {defineComponent} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";

export default defineComponent({
  name: "Exposure",

  data() {
    return {
      store: useStatStore()
    }
  },

  props: {
    index: {
      type: Number,
      required: true
    },
  },

  methods: {
    /**
     * Function to covert a time based stat (usually in seconds) into a readable format.
     * @param key - key of the stat
     * @param index - index in the user steam stats object.
     * @returns - a string containing a time split into hours, minutes and seconds.
     */
    convertTime(key: string, index: number) {

      // get stat
      const seconds = this.store.getStatByKey(this.store.userSteamStats, index, key)

      // define time boundaries.
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secondsRemaining = seconds % 60;

      // create an empty array to store the time in
      let time = [];

      // filter hours, minutes, seconds into an array
      if (hours > 0) {
        time.push(`${hours} hour${hours > 1 ? 's' : ''}`);
      }

      if (minutes > 0) {
        time.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
      }

      if (seconds > 0) {
        time.push(`${secondsRemaining.toFixed()} second${secondsRemaining > 1 ? 's' : ''}`);
      }

      // check if the time is 0
      if (time.length === 0) {
        return '0 seconds';
      }

      // combine the array into a string.
      return time.join(', ');
    }
  }
})
</script>

<template>
  <div class="additional">
    <div class="stat">
      <span class="key">Cold Exposure:</span>
      <span class="value">
        {{convertTime('cold_exposure_duration', index)}}
      </span>
    </div>
    <div class="stat">
      <span class="key">Heat Exposure:</span>
      <span class="value">
        {{convertTime('hot_exposure_duration', index)}}
      </span>
    </div>
    <div class="stat">
      <span class="key">Radiation Exposure:</span>
      <span class="value">
        {{convertTime('radiation_exposure_duration', index)}}
      </span>
    </div>
    <div class="stat">
      <span class="key">Comfort:</span>
      <span class="value">
        {{convertTime('comfort_duration', index)}}
      </span>
    </div>
    <div class="stat">
      <span class="key">Time Spoken:</span>
      <span class="value">
        {{convertTime('seconds_speaking', index)}}
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