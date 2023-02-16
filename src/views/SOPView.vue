<template>
  <main>
    <div>
      <h1 class="display-3">SOP's</h1>
      <section id="general_information">
        <h2 class="display-6">General Information</h2>
        <ul class="list-group">
          <li class="list-group-item">
            1. Observations are stored in app_data.json in the resources folder in the app folder. They can be backed up to CSV on the "View Observations" page.
          </li>
          <li class="list-group-item">
            2. Usernames and passwords are also stored in app_data.json, however passwords are encrypted.
          </li>
          <li class="list-group-item">
            3. Users will be logged out automatically after 4 hours, or when the
            logout button is pressed.
          </li>
        </ul>
      </section>
      <section id="creating_observations">
        <h2 class="display-6">Creating Observations</h2>
        <ul class="list-group">
          <li class="list-group-item">
            1. You must be logged in to create an observation, the link will
            appear on the navigation bar.
          </li>
          <li class="list-group-item">
            2. When choosing the date and time, the form will not take minutes
            into account, only the hour. It will not round up, only down.
          </li>
          <li class="list-group-item">
            3. The form will catch some errors, but is not perfect. Please check
            your observation before submitting.
          </li>
          <li class="list-group-item">
            4. As you fill the observation, it will begin to be coded up above
            in the black box. This will be committed to the cookies.
          </li>
          <li class="list-group-item">
            5. The logged in observer will be attached to the observation on
            submission.
          </li>
        </ul>
      </section>
      <section id="editing_observations">
        <h2 class="display-6">Editing Observations</h2>
        <ul class="list-group">
          <li class="list-group-item">
            1. You can edit observations or delete them in the "View
            Observations" page.
          </li>
          <li class="list-group-item">
            2. Editing then submitting an observation will overwrite the
            previous one.
          </li>
          <li class="list-group-item">
            3. Whoever edited the observation will become the "Observer" for
            that observation.
          </li>
        </ul>
      </section>
      <section id="back_up_restore">
        <h2 class="display-6">Back Up/Restore</h2>
        <ul class="list-group">
          <li class="list-group-item">
            1. On the "View Observations" page, you can copy all of the
            observations to the clipboard, which can be saved to a spreadsheet.
            It is good practice to add the date/time that the backup was made in
            the cell to the left.
          </li>
          <li class="list-group-item">
            2. You can then paste the backup from the cell into the form under
            "Import Observation Data", which will automatically filter out
            duplicates.
          </li>
        </ul>
      </section>
      <section id="viewing_data">
        <h2 class="display-6">Viewing Data</h2>
        <ul class="list-group">
          <li class="list-group-item">
            1. On the "View Data" page, you can filter by data type and date in order to see a data in the form of a line chart.
          </li>
        </ul>
      </section>
      <section id="administrator" v-if="this.users.current_user == 'admin'">
        <h2 class="display-6">Administrator</h2>
        <ul class="list-group">
          <li class="list-group-item">
            1. If you forget the administrator password, you will need to delete the account from the app_data.json file under resources in the app folder. 
          </li>
          <li class="list-group-item">
            2. When logged in as the administrator, you will see the "Manage
            Users" link on the navigation bar. Here you can delete or create new
            users/observers.
          </li>
        </ul>
      </section>
    </div>
    <nav class="section-nav">
      <ol class="bullet-list">
        <li><a href="#general_information">General Information</a></li>
        <li><a href="#creating_observations">Creating Observations</a></li>
        <li><a href="#editing_observations">Editing Observations</a></li>
        <li><a href="#back_up_restore">Back up/Restore</a></li>
        <li><a href="#viewing_data">Viewing Data</a></li>
        <li v-if="this.users.current_user == 'admin'">
          <a href="#administrator">Administrator</a>
        </li>
      </ol>
    </nav>
  </main>
</template>

<script>
export default {
  data() {
    return {
      observer: null,
    };
  },
  props: ["users"],
  created() {
    this.observer = new IntersectionObserver(this.onElementObserved, {
      root: this.$el,
      threshold: 0.22,
    });
  },
  mounted() {
    this.$el.querySelectorAll("section[id]").forEach((section) => {
      this.observer.observe(section);
    });
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    onElementObserved(entries) {
      entries.forEach(({ target, isIntersecting }) => {
        const id = target.getAttribute("id");
        if (isIntersecting) {
          this.$el
            .querySelector(`nav li a[href="#${id}"]`)
            .parentElement.classList.add("active");
        } else {
          this.$el
            .querySelector(`nav li a[href="#${id}"]`)
            .parentElement.classList.remove("active");
        }
      });
    },
  },
};
</script>
<style scoped>
/* Sidebar Navigation */
.section-nav {
  margin-top: 2rem;
  padding-left: 0;
  border-left: 1px solid #efefef;
}

.section-nav a {
  text-decoration: none;
  display: block;
  padding: 0.125rem 0;
  color: black;
  transition: all 50ms ease-in-out;
}

.section-nav a:hover,
.section-nav a:focus {
  color: #666;
}

.section-nav li.active > a {
  color: #f2765d;
  font-weight: 500;
}

/* Sticky Navigation */
main > nav {
  position: sticky;
  top: 2rem;
  align-self: start;
}

ul.bullet-list,
ol.bullet-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  margin-left: 1rem;
}

/** page layout **/
main {
  display: grid;
  grid-template-columns: 1fr 15em;
  max-width: 100em;
  width: 90%;
  margin: 0 auto;
}

/** enlarge the sections for this demo, so that we have a long scrollable page **/
section {
  margin-bottom: 50rem;
}
</style>
