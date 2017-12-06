import Vue from 'vue';

(() => {
    new Vue({
        el: '#data',
        data: {
            message: 'Hello guuys',
            errorMessage: true,
            apiKEY: '53f9d8e4213222cf517d86dc406d67fc',
            baseURL: 'http://api.openweathermap.org/data/2.5/weather',
            weather: {
                cTemp: '',
                fTemp: '',
                weatherNiceName: '',
                cTempMin: '',
                cTempMax: '',
                fTempMin: '',
                fTempMax: '',
                icon: '',
            },
        },
    
        mounted: function () {
            this.location();
        },
    
        methods: {
            location: function () {
                // 1. get users location
                // 2. and handle error

                const geoSuccess = ({ coords }) => {
                    this.getLocation(coords);
                };

                const geoError = () => {
                    console.log('noooo!');
                };

                if (navigator.geolocation) {
                    var gl = navigator.geolocation;
                    gl.getCurrentPosition(geoSuccess, geoError);
                } else {
                    console.log('your browser sucks!');
                }
            },
            getLocation: function({ latitude, longitude }) {
                // 1. get weather 
                const self = this;

                $.getJSON(this.apiUrl(latitude, longitude), function (data) {
                    console.log(data);
                    self.mapData(data)
                });
            },
            mapData: function({ 
                main: { temp, temp_min, temp_max },
                weather
            }) {
                this.weather.fTemp = this.convertKelvinToFahrenheit(temp);
                this.weather.fTempMax = this.convertKelvinToFahrenheit(temp_max);
                this.weather.fTempMin = this.convertKelvinToFahrenheit(temp_min);
                this.weather.cTemp = this.convertKelvinToCelcius(temp);
                this.weather.cTempMax = this.convertKelvinToCelcius(temp_max);
                this.weather.cTempMin = this.convertKelvinToCelcius(temp_min);
                this.weather.weatherNiceName = weather[0].description;
                this.weather.icon = this.weatherIcon(weather[0].icon);
            },
            weatherIcon: function(iconName) {
                return `${iconName}.png`;
            },
            convertKelvinToCelcius: function(deg) {
                return Math.round(parseInt(deg) - 273.15);
            },
            convertKelvinToFahrenheit: function(deg) {
                return Math.round(parseInt(deg) * (9 / 5) - 459.67);
            },
            apiUrl: function(latitude, longitude) {
                return `${this.baseURL}?lat=${latitude}&lon=${longitude}&appid=${this.apiKEY}`;
            },
            convert: function(degree) {
                fTemp = (degree) * (9 / 5) - 459.67;
                console.log(fTemp);
                this.locationDetails.push({
                    fTemp : this.fTemp
                });
            },
            addWeather: function () {
                this.locationDetails.push({
                    weatherType: this.newWeather
                });
            }
        }
    })
})();