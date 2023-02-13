// import { resolveResource } from '@tauri-apps/api/path'
// alternatively, use `window.__TAURI__.path.resolveResource`
// import { readTextFile } from '@tauri-apps/api/fs'
// alternatively, use `window.__TAURI__.fs.readTextFile`

export class Observations {
    constructor(user) {
        console.log("Observations has been instantiated.")
        this.observations = [];
        this.getObservations();
        this.edit_observation_index = "";
        this.user = user;
        this.csv_data = "";
        this.test = "";
        this.duplicates = [];
        console.log(this.observations)
        // this.observations_from_json(true)
    }
    setObservations() {
        console.log("setting observations")
        console.log(this.observations)
        for (let observation_index in this.observations) {
            const observationAsJson = JSON.stringify(this.observations[observation_index]);
            let cookieName = `observation${observation_index}`;
            const expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (10000 * 24 * 60 * 60 * 1000));
            let expires = "expires=" + expiryDate.toUTCString();
            document.cookie = cookieName + "=" + observationAsJson + ";" + expires + ";path=/";
        }
    }
    getObservations() {
        console.log("running getObservations")
        var observations_from_cookies = [];
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split(';');
        console.log(cookieArray)
        for (let i = 0; i < cookieArray.length; i++) {
            let name = `observation${i}=`;
            for (let j = 0; j < cookieArray.length; j++) {
                let cookie = cookieArray[j];
                while (cookie.charAt(0) == ' ') {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf(name) == 0) {
                    let observationAsJson = cookie.substring(name.length, cookie.length);
                    observations_from_cookies.push(JSON.parse(observationAsJson))
                }
            }
            // what if there is no cookies to use?

        }
        console.log(observations_from_cookies)
        this.observations = observations_from_cookies;
        console.log("observations before sorting by date:");
        console.log(this.observations)
        // this.observations.sort(function (a, b) {
        //     return b.date - a.date
        // });
        this.observations.sort(function (a, b) {
            var c = new Date(a.date);
            var d = new Date(b.date);
            return c - d;
        });
        console.log("observations after sorting by date:");
        console.log(this.observations);
        return observations_from_cookies;
    }

    deleteObservation(observation_index) {
        // console.log("Start of deleteObservation" + this.observations)
        // this.observations.splice(observationIndex, 1);
        // console.log("After Splice" + this.observations)
        // this.setObservations(this.observations);
        // console.log("After setOBservations" + this.observations)
        console.log("inside delete observations")
        console.log("observation index: " + observation_index);
        console.log(this.observations);
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split(';');
        console.log(cookieArray)
        for (let i = 0; i < this.observations.length; i++) {
            let name = `observation${i}=`;
            console.log("deleting " + name)
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
        // decodedCookie = decodeURIComponent(document.cookie);
        // cookieArray = decodedCookie.split(';');
        // console.log(cookieArray);
        // console.log(this.observations)

        this.observations.splice(observation_index, 1);
        this.setObservations();
        this.getObservations();
    }
    addObservation(observation) {
        console.log("adding observation")
        this.observations.push(observation);
        this.observations.sort(function (a, b) {
            var c = new Date(a.date);
            var d = new Date(b.date);
            return c - d;
        });
        this.setObservations();
        return this.observations;
    };

    copySummaryCSVToClipboard() {
        var observations_as_json = JSON.stringify(this.observations);
        navigator.clipboard.writeText(observations_as_json)
    };

    import_csv_to_cookies() {
        this.duplicates = [];
        const parsed_observations = JSON.parse(this.csv_data)
        var unique_observation_dates = [];
        for (let i = 0; i < this.observations.length; i++) {
            unique_observation_dates.push(this.observations[i].date);
        }
        for (let i = 0; i < parsed_observations.length; i++) {
            var observation = parsed_observations[i];
            if (unique_observation_dates.includes(observation.date)) {
                console.log(`Duplicate date, [ ${observation.date} ] not added to observations.`)
                this.duplicates.push(observation.date)
            } else {
                this.observations.push(observation)
            }
            this.setObservations();
        }
    };

    // observations_from_json(tauri_app) {
    //     if (tauri_app) {
    //         const resourcePath = window.__TAURI__.path.resolveResource('resources/observations_as_json.json')
    //         const observations = JSON.parse(window.__TAURI__.fs.readTextFile(resourcePath));
    //         console.log(observations)
    //     } else {
    //         console.log("not inside tauri app")
    //         console.log(observations)
    //     }
    //     // `resources/observations_as_json.json` is the value specified on `tauri.conf.json > tauri > bundle > resources`

    // }
}
