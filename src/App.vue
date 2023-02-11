<script setup>
// import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container" id="app">
    <Navbar
      v-bind:users="users"
      v-bind:user="user"
      v-bind:observation="observation"
      v-bind:observations="observations"
      v-bind:config="config"
      v-bind:temperature_data="temperature_data"
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

export default {
  data() {
    return {
      users: {},
      user: {},
      observation: {},
      observations: {},
      config: config,
      temperature_data: {},
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
  },
};
</script>

<style>
</style>
