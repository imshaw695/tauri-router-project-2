<script setup>
</script>

<template>
  <main>
    <div class="mt-3">
      <ul class="list-group">
          <li class="list-group-item display-5">
            Welcome to the Observation Organiser!
          </li>
          <li class="list-group-item">
            - This software was created to improve the data quality, record keeping and efficiency of weather observations.
          </li>
          <li class="list-group-item">
            - It enables its users to enter observations to be encoded as well as view and edit previously made observations.
          </li>
          <li class="list-group-item">
            - This application is a work in progress, and any suggestions would be welcomed by AB Shaw at ivan.shaw108@mod.gov.uk.
          </li>
          <li class="list-group-item">
            - To begin, login to the admin account to start creating observer accounts, and you will see the navigation bar populate.
          </li>
        </ul>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      test_dict: {}
    }
  },
  props: [
    "users",
    "tauri_app",
  ]
}
</script>