<template>
  <h1 class="display-3">Data View</h1>
  <div>
    <select class="form-control" v-model="this.temperature_data.data_type">
      <option value="dbulb">Dry bulb temperature</option>
      <option value="dpoint">Dewpoint temperature</option>
      <option value="pressure">Pressure</option>
      <option value="wspeed">Wind speed</option>
      <option value="pressure">Pressure</option>
      <option value="pressurechange">Pressure Change</option>
      <option value="visibility">Visibility</option>
      <option value="seatemp">Sea Surface Temperature</option>
      <option value="seaperiod">Sea Period</option>
      <option value="seaheight">Sea Height</option>
      <option value="swellperiod1">Swell Period 1</option>
      <option value="swellperiod2">Swell Period 2</option>
      <option value="swellheight1">Swell Height 1</option>
      <option value="swellheight2">Swell Height 2</option>
      <option value="cloudTotal">Total Cloud</option>
      <option value="lowCloudTotal">Total Low Cloud</option>
    </select>
  </div>
  <div>
    <select
      class="form-control mt-2"
      v-model="this.temperature_data.date_filter"
      v-on:change="this.update_chart()"
    >
      <option v-for="option in this.temperature_data.date_filter_options">
        {{ option }}
      </option>
    </select>
  </div>
  <canvas id="temperature_chart"></canvas>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";

export default {
  props: [
    "users",
    "user",
    "observations",
    "observation",
    "config",
    "temperature_data",
    "tauri_app"
  ],
  methods: {
    update_chart() {
      console.log("inside update_chart");
      this.temperature_data.set_dynamic_params();
      this.temperature_data.create_data_structure();
      if (this.temperature_chart) {
        this.temperature_chart.destroy();
      }
      const canvas = document.getElementById("temperature_chart");
      this.temperature_chart = new Chart(
        canvas,
        this.temperature_data.data_structure
      );
    },
  },
  mounted() {
    this.update_chart();
  },
  created() {},
};
</script>