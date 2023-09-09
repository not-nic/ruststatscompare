<script lang="ts">
import {defineComponent} from 'vue'
import { Profile } from "../stores/StatStore.ts"

export default defineComponent({
  name: "UserProfile",

  props: {
    steamId: String,
    name: String,
    dateCreated: String,
    avatarUrl: String,
    hours: Number
  }
})
</script>

<template>
  <div class="profile">
    <div class="head">
      <span>{{name}}'s Profile</span>
      <a>Close</a>
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
            <span>{{hours.toLocaleString('en-gb')}} Hours</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  min-width: 500px;
}

.head {
  display: flex;
  justify-content: space-between;
  background-color: #2a2a2a;
  padding: 5px 15px 5px 15px;
  font-family: 'Roboto Condensed', sans-serif;
}

.body {
  display: flex;
  align-content: center;
  font-family: 'Roboto Condensed', sans-serif;
  gap: 15px;
  background-color: #212121;
  padding: 10px;
  align-items: center;
}

img {
  width: 100%;
  max-width: 130px;
  border-radius: 5px;
}


h2 {
  text-align: left;
  margin: 0;
  font-weight: 700;
}

.info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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

.key {
  color: #A4A4A4;
}
</style>