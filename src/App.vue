<script setup>
// import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <p v-if="tauri_app">Inside tauri</p>
  <p v-if="!(tauri_app)">Not inside tauri</p>
  <div class="container" id="app">
    <Navbar
      v-bind:users="users"
      v-bind:user="user"
      v-bind:observation="observation"
      v-bind:observations="observations"
      v-bind:config="config"
      v-bind:temperature_data="temperature_data"
      v-bind:tauri_app="tauri_app"
    />
  </div>
</template>

<script>
import { reactive } from "vue";
import { Observation } from "../Observation.js";
import { Observations } from "../Observations.js";
import config from "../chart_data";
import { Temperature_data } from "../chart_data";
import { User } from "../User";
import { Users } from "../Users";
import ObservationTest from "./components/ObservationTest.vue";
import Navbar from "./components/Navbar.vue";
import { resolveResource } from '@tauri-apps/api/path'
// alternatively, use `window.__TAURI__.path.resolveResource`
import { readTextFile } from '@tauri-apps/api/fs'
// alternatively, use `window.__TAURI__.fs.readTextFile`
import { resourceDir } from '@tauri-apps/api/path';

export default {
  data() {
    return {
      users: {},
      user: {},
      observation: {},
      observations: {},
      config: config,
      temperature_data: {},
      tauri_app: false,
    };
  },
  components: {
    ObservationTest,
    Navbar,
  },
  methods: {
    check_logged_in() {
      this.users.current_user = this.user.check_logged_in();
      console.log(this.users);
      if (!this.users.logged_in) {
        console.log("not logged in");
      }
      setTimeout(this.check_logged_in, 5000);
    },
    check_tauri() {
      if (window.__TAURI__) {
        this.tauri_app = true;
      }
    },
    async observations_from_json() {
      if (this.tauri_app) {
            console.log("before resourceDirPath set")
            const resourceDirPath = await resourceDir();
            console.log("resourceDirPath:" + resourceDirPath)
            console.log("before resourcePath set")
            const resourcePath = await resolveResource("resources/observations_as_json.json");
            console.log(resourcePath)
            console.log("Before readTextFile")
            console.log(readTextFile(resourcePath));
            console.log("before JSON.parse");
            const observations = JSON.parse(await readTextFile(resourcePath));
            console.log(observations)
        } 
    }
  },
  created() {
    const users = reactive(new Users());
    const user = reactive(new User(users));
    const observation = reactive(new Observation(user, users));
    const observations = reactive(new Observations(user));
    const temperature_data = reactive(new Temperature_data(observations));
    this.users = users;
    this.user = user;
    this.observation = observation;
    this.observations = observations;
    this.temperature_data = temperature_data;
    this.check_logged_in();
    this.check_tauri();
    this.observations_from_json();
  },
};
</script>

<style>
</style>
