// this first dictionary below is purely as a test!
import { Chart } from 'chart.js';
import 'chartjs-adapter-moment';

export class Temperature_data {
    constructor(observations) {
        this.date_filter = ""
        this.date_filter_options = []
        this.observations = observations;
        this.test = "";
        this.type = "scatter";
        this.data_type = "";
        this.labels = [];
        this.label = "";
        this.backgroundColor = "rgba(54,73,93,.5)";
        this.borderColor = "#36495d";
        this.borderWidth = 3;
        this.datasets_data = []
        this.datasets = [{
            label: this.label,
            data: this.datasets_data,
        }];
        this.data = []
        this.options = {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    }
                },
                y: {}
            },
            showLine: true,
        };
        this.data_structure = {};
        console.log('temperature_data instantiated');
        // this.create_data_structure();
        // this.set_dynamic_params();
    }


    //this method just takes this.data_type and sets the label with it.
    set_label() {
        switch (this.data_type) {
            case "wspeed":
                this.label = "Wind Speed"
                break;
            case "dbulb":
                this.label = "Dry Bulb Temperature"
                break;
            case "dpoint":
                this.label = "Dew point temperature"
                break;
            case "pressure":
                this.label = "Pressure"
                break;
            case "pressurechange":
                this.label = "Pressure Change"
                break;
            case "visibility":
                this.label = "Visibility (M)"
                break;
            case "seatemp":
                this.label = "Sea Surface Temperature"
                break;
            case "seaperiod":
                this.label = "Sea Period"
                break;
            case "seaheight":
                this.label = "Sea Height"
                break;
            case "swellheight1":
                this.label = "Swell Height 1"
                break;
            case "swellheight2":
                this.label = "Swell Height 2"
                break;
            case "swellperiod1":
                this.label = "Swell Period 1"
                break;
            case "swellperiod2":
                this.label = "Swell Period 2"
                break;
            case "cloudTotal":
                this.label = "Total Cloud"
                break;
            case "lowCloudTotal":
                this.label = "Total Low Cloud"
                break;
        }

        return this.label;
    }

    // this function takes the data_type selected from the drop down and gathers data from observations.
    // set_datasets_data() {
    //     this.datasets_data = [];


    // }

    // this method will set the parameters that change depending on data in observations, ie. labels and data
    set_dynamic_params() {
        // Here I will need a function that returns the dates from individual observations by looping
        // over this.observations.observations.
        this.date_filter_options = []
        this.datasets_data = []
        let key = `${this.data_type}`
        var y_data = [];
        for (const [index, observation] of Object.entries(this.observations.observations)) {
            let data_point = {};
            y_data.push(observation[key]);
            this.datasets_data.push(data_point)
            let date_array = observation.date.split("T");
            let date_option = date_array[0];
            if (date_array[0] == this.date_filter) {
                data_point.x = observation.date;
                data_point.y = observation[key]
            }
            if (!(this.date_filter_options.includes(date_option))) {
                this.date_filter_options.push(date_option)
            }
        }
        this.options.scales.y.max = Math.max(...y_data) + 1
        this.options.scales.y.min = Math.min(...y_data) - 1
        return this.datasets_data
    }

    create_data_structure() {
        this.set_label();
        this.datasets = [{
            label: this.label,
            data: this.datasets_data,
        }];
        this.data = {
            labels: this.labels,
            datasets: this.datasets
        };
        this.data_structure.type = this.type;
        this.data_structure.data = this.data;
        this.data_structure.options = this.options;
        this.data_structure.showLine = true;
    }
}

export default Temperature_data