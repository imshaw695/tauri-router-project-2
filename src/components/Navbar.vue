<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
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
        <li class="nav-item" v-if="users.logged_in">
          <RouterLink to="/createobservation" class="nav-link px-2"
            >Create Observation</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink to="/data" class="nav-link px-2">View Data</RouterLink>
        </li>
        <!-- Change it so this one only appears if someone is not already logged in -->
        <li class="nav-item"  v-if="!(users.logged_in)">
          <RouterLink to="/login" class="nav-link px-2">Login</RouterLink>
        </li>
        <!-- Make it so this appears if the admin is logged in -->
        <li class="nav-item" v-if="users.current_user == 'admin'">
          <RouterLink to="/createuser" class="nav-link px-2"
            >Manage Users</RouterLink
          >
        </li>
        <!-- Make it so this appears if logged in is true -->
        <li class="nav-item" v-if="users.logged_in">
          <a href="#" @click="user.logout()" class="nav-link px-2"
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
      :tauri_app="tauri_app"
    />
</template>

<script>
export default {
    props: [
        "users",
        "user",
        "observation",
        "observations",
        "config",
        "temperature_data",
        "tauri_app"
    ],
}
</script>