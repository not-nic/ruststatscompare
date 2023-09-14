<script lang="ts">
import {defineComponent} from 'vue'
import {useStatStore} from "../stores/StatStore.ts";

export default defineComponent({
  name: "UserProfile",

  props: {
    index: {
      type: Number,
      required: true
    },
    steamId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    dateCreated: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      statStore: useStatStore()
    }
  }
})
</script>

<template>
  <div class="profile">
    <div class="head">
      <span>{{name}}'s Profile</span>
      <a @click="statStore.removePlayer(<number>index)">Remove</a>
    </div>
    <div class="body">
      <img :src="avatarUrl" :alt="`${name}'s steam profile picture`">
      <div class="info">
        <div class="row">
          <h2>{{name}}</h2>
          <a class="small" :href="`https://steamcommunity.com/profiles/${steamId}/`" target="_blank">View Profile</a>
        </div>
        <div class="row bot">
          <div class="text">
            <span class="key">Date Created:</span>
            <span>{{dateCreated}}</span>
          </div>
          <div class="text">
            <span class="key">Hours Played:</span>
            <span class="value">{{hours?.toLocaleString('en-gb')}} Hours</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile {
  min-width: 480px;
  display: flex;
  flex-direction: column;
}

.head {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px 5px 15px;
  font-family: 'Roboto Condensed', sans-serif;
  background-color: #2a2a2a;
  border-radius: 5px 5px 0 0;
}

.body {
  display: flex;
  align-content: center;
  align-items: center;
  gap: 15px;
  padding: 10px;
  font-family: 'Roboto Condensed', sans-serif;
  background-color: #212121;
  border-radius: 0 0 5px 5px;
}

img {
  width: 100%;
  max-width: 130px;
  border-radius: 5px;
}

h2 {
  margin: 0;
  text-align: left;
  font-weight: 700;
}

.info {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 15px;
}

.bot {
  flex-direction: column;
  gap: 5px;
  padding: 10px 0 0 0;
}

.small {
  font-size: 14px;
}

.text {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>