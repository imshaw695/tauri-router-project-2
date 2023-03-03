import { resolveResource } from '@tauri-apps/api/path'
import { readTextFile } from '@tauri-apps/api/fs'
import { writeTextFile } from '@tauri-apps/api/fs';

export class Observations {
    constructor(user) {
        console.log("Observations has been instantiated.")
        this.observations = [];
        // this.getObservations();
        this.edit_observation_index = "";
        this.user = user;
        this.csv_data = "";
        this.test = "";
        this.duplicates = [];
        this.path_to_app_data = "resources/app_data.json";
    }
    async setObservations(tauri_app) {
        console.log("setting observations")
        if (tauri_app) {
            const resourcePath = await resolveResource(this.path_to_app_data);
            var app_data = JSON.parse(await readTextFile(resourcePath));
            app_data.observation_data = this.observations
            const content = JSON.stringify(app_data);
            console.log(resourcePath)
            await writeTextFile(resourcePath, content);
            this.getObservations(tauri_app);
            return JSON.parse(await readTextFile(resourcePath));
        } else {
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
    }
    async getObservations(tauri_app) {
        console.log("running getObservations")

        if (tauri_app) {
            const resourcePath = await resolveResource("resources/app_data.json");
            console.log(resourcePath)
            console.log(readTextFile(resourcePath));
            const app_data = JSON.parse(await readTextFile(resourcePath));
            const observations = app_data.observation_data
            console.log(observations)
            this.observations = observations;
        } else {
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
    }

    deleteObservation(observation_index, tauri_app) {
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
        this.setObservations(tauri_app);
        this.getObservations(tauri_app);
    }
    addObservation(observation, tauri_app) {
        console.log("adding observation")
        this.observations.push(observation);
        this.observations.sort(function (a, b) {
            var c = new Date(a.date);
            var d = new Date(b.date);
            return c - d;
        });
        this.setObservations(tauri_app);
        return this.observations;
    };

    copySummaryCSVToClipboard() {
        var observations_as_json = JSON.stringify(this.observations);
        navigator.clipboard.writeText(observations_as_json)
    };

    import_csv(tauri_app) {
        console.log("inside import_csv")
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
            this.setObservations(tauri_app);
        }
    };

    // combine with getObservations with the if statement remaining and else for non-tauri app (web)
    // async observations_from_json(tauri_app) {
    //     if (tauri_app) {
    //           const resourcePath = await resolveResource("resources/observations_as_json.json");
    //           console.log(resourcePath)
    //           console.log(readTextFile(resourcePath));
    //           const observations = JSON.parse(await readTextFile(resourcePath));
    //           console.log(observations)
    //       } 
    //   }

    // async write_to_json(tauri_app) {
    //     if (tauri_app) {
    //         const content = JSON.stringify({ "observation2":"BBXX2"});
    //         const resourcePath = await resolveResource("resources/observations_as_json.json");
    //         console.log(resourcePath)
    //         await writeTextFile(resourcePath, content);
    //     }
    // }
}
