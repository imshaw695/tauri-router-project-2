<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container" v-if="!(this.$router.name == 'home')">
    <nav class="navbar navbar-expand bg-light">
      <ul class="navbar-nav">
        <a href="#" class="navbar-brand">
          <img id="navy_img" src="@/assets/Logo_of_the_Royal_navy.svg.png" />
        </a>
        <li class="nav-item">
          <RouterLink to="/" class="nav-link px-2">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/viewobservations" class="nav-link px-2"
            >View Observations</RouterLink
          >
        </li>
        <!-- I need to make it so they have to be logged in for this to appear -->
        <li class="nav-item">
          <RouterLink to="/createobservation" class="nav-link px-2"
            >Create Observation</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink to="/data" class="nav-link px-2">View Data</RouterLink>
        </li>
        <!-- Change it so this one only appears if someone is not already logged in -->
        <li class="nav-item">
          <RouterLink to="/login" class="nav-link px-2">Login</RouterLink>
        </li>
        <!-- Make it so this appears if the admin is logged in -->
        <li class="nav-item">
          <RouterLink to="/createuser" class="nav-link px-2"
            >Manage Users</RouterLink
          >
        </li>
        <!-- Make it so this appears if logged in is true -->
        <li class="nav-item">
          <a href="#" @click="this.user.logout()" class="nav-link px-2"
            >Logout</a
          >
        </li>
        <li class="nav-item">
          <RouterLink to="/sop" class="nav-link px-2"
            >SOP's</RouterLink
          >
        </li>
      </ul>
    </nav>
    <RouterView
      :users="users"
      :user="user"
      :observation="observation"
      :observations="observations"
      :config="config"
      :temperature_data="temperature_data"
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
import { Users } from "../Users"
import ObservationTest from "./components/ObservationTest.vue";
const users = reactive(new Users());
const user = reactive(new User(users));
const observation = reactive(new Observation(user,users));
const observations = reactive(new Observations(user));
const temperature_data = reactive(new Temperature_data(observations));
export default {
  data() {
    return {
      users: users,
      user: user,
      observation: observation,
      observations: observations,
      config: config,
      temperature_data: temperature_data,
    };
  },
  components: {
    ObservationTest,
  },
  methods: {
    check_logged_in() {
      this.users.current_user = this.user.check_logged_in();
      console.log(this.users)
      if (!this.users.logged_in) {
            console.log("not logged in")
        }
      setTimeout(this.check_logged_in, 5000);
    },
  },
  created() {
    this.check_logged_in();
  },
};
</script>

<style>
</style>
