<template>
  <div class="container">
    <h1 class="display-3">Login</h1>
    <form action="">
      <div class="row mb-2">
        <div class="col-1 mt-2">
          <label class="form-label" for="user">User</label>
        </div>
        <div class="col-6">
          <input
            v-model="this.user.user_name"
            class="form-control"
            id="user"
            type="text"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-1 mt-2">
          <label class="form-label" for="password">Password</label>
        </div>
        <div class="col-6">
          <input
            v-model="this.user.user_password"
            class="form-control"
            id="password"
            type="password"
          />
        </div>
        <div class="col-3">
          <button type="button" @click="this.login()" class="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";

export default {
  data() {
    return {};
  },
  props: ["users","user","tauri_app",],
  methods: {
    login() {
      this.user.login();
    },
  },
};
</script>