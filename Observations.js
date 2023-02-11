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
            for (let j=0;j<cookieArray.length;j++) {
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
        return observations_from_cookies;
    }

    deleteObservation(observationIndex) {
        // console.log("Start of deleteObservation" + this.observations)
        // this.observations.splice(observationIndex, 1);
        // console.log("After Splice" + this.observations)
        // this.setObservations(this.observations);
        // console.log("After setOBservations" + this.observations)
        console.log("setting observations")
        console.log(this.observations)
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split(';');
        for (let observation_index in this.observations) {
            const observationAsJson = JSON.stringify(this.observations[observation_index]);
            let cookieName = `observation${observation_index}`;
            
            let expires = "expires=Thu, 01 Jan 1970 00:00:01 GMT";
            document.cookie = cookieName + "=" + observationAsJson + ";" + expires + ";path=/";
            if (cookie.indexOf(cookieName) == 0) {
                return cookieName
            }
        }
        this.getObservations();
        console.log(this.observations)
        return this.observations;
    }
    addObservation(observation) {
        console.log("adding observation")
        this.observations.push(observation);
        this.observations.sort(function (a, b) {
            return b.date - a.date
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
    }
}
