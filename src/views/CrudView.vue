<template>
  <div class="card mt-0">
    <h1 class="py-2 display-3" style="text-align: center">Observation Data</h1>
    <button
      class="btn btn-primary mb-2 mx-2"
      @click="this.observations.copySummaryCSVToClipboard()"
    >
      Copy observations to clipboard
    </button>
    <ul class="list-group mx-2">
      <li
        v-for="observation in observations.observations"
        :key="observation.date"
        class="list-group-item text-center"
      >
        <div class="row">
          <p style="text-align: center">
            <strong>Date:</strong> {{ observation.date }}<br />
            <strong>Encoded observation: </strong>{{ observation.encoded
            }}<br />
            <strong>Observer: </strong>{{ observation.observer }}
          </p>
        </div>
        <div class="row">
          <div class="col-6">
            <button
              v-on:click="
                this.delete(
                  this.observations.observations.indexOf(observation)
                );
                this.getObservations();

              "
              class="btn btn-danger"
            >
              Delete
            </button>
          </div>
          <div class="col-6">
            <button
              @click="
                this.set_index(
                  this.observations.observations.indexOf(observation)
                )
              "
              class="btn btn-primary"
            >
              Edit
            </button>
          </div>
        </div>
      </li>
    </ul>
    <h2 class="display-4 pt-2" style="text-align: center">
      Import Observation Data
    </h2>
    <h3 class="display-6 mx-2">Guide:</h3>
    <ul class="list-group mx-2">
      <li class="list-group-item">Open spreadsheet.</li>
      <li class="list-group-item">
        Select cell with backup data, copy and paste into the field below, then
        press "Add data".
      </li>
      <li class="list-group-item">
        Duplicate observations will be automatically filtered out.
      </li>
      <li class="list-group-item">
        You can view duplicated dates in the console, and you can delete dates
        you wish to overwrite above before resubmitting.
      </li>
    </ul>
    <div class="row mx-2 my-3">
      <div class="col-10">
        <textarea
          class="form-control"
          cols="57"
          v-model="this.observations.csv_data"
          placeholder="Paste CSV data here."
        >
        </textarea>
      </div>
      <div class="col-2">
        <button
          class="btn btn-primary"
          @click="this.observations.import_csv_to_cookies()"
        >
          Add data
        </button>
      </div>
    </div>
    <ul class="list-group mx-2">
      <li
        v-for="duplicate in observations.duplicates"
        class="list-group-item text-center mx-2"
      >
        Observation from {{ duplicate }} not added to the cookies.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: "",
    };
  },
  props: ["observations", "observation", "users"],
  methods: {
    delete(observationIndex) {
      this.observations.deleteObservation(observationIndex);
    },
    getObservations() {
      this.test = this.observations.getObservations();
    },
    set_index(index) {
      this.observations.edit_observation_index = index;
      this.$router.push({ name: "editobservation" });
    },
  },
  computed: {
    length: function () {
      return this.observations.observations.length;
    },
  },
};
</script>>
