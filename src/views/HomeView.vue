<script setup>
</script>

<template>
  <main>
    <div class="card my-3 px-3 py-2">
      <p>Welcome to the Weather Observation web application prototype, please login and progress to the "Create Observation" page in order to start compiling your observation.</p>
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
    "users"
  ]
}
</script>