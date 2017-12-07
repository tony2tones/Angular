import Vue from 'vue';

(() => {
    new Vue({
        el: '#data',
        data: {
            message: 'Hello guuys',
            errorMessage: false,
            loading: false,
            apiKEY: '53f9d8e4213222cf517d86dc406d67fc',
            baseURL: 'http://api.openweathermap.org/data/2.5/weather',
            src: '',
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
                    console.log('its loading....');
                    this.loading = true;
                    this.getLocation(coords);
                };

                const geoError = () => {
                    //throw an error message to the user
                    this.errorMessage = true;
                    this.loading = false;
                };

                if (navigator.geolocation) {

                    var gl = navigator.geolocation;
                    gl.getCurrentPosition(geoSuccess, geoError);
                } else {
                    console.log('your browser sucks!');
                }
            },
            getLocation: function ({ latitude, longitude }) {
                // 1. get weather 
                const self = this;
                $.getJSON(this.apiUrl(latitude, longitude), function (data) {
                    console.log(data);
                    self.mapData(data)
                });
            },
            mapData: function ({
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
                //turn off loading div
                this.loading = false;

            },
            weatherIcon: function (iconName) {
                // return iconName
                this.src = iconName;
                console.log(this.src);
                if (iconName === '01d' || '01n') {
                    $("#image").attr("src", "https://static.pexels.com/photos/557782/pexels-photo-557782.jpeg");
                } else if (iconName === '02d' || '02n') {
                    $("#image").attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Cumulus_Clouds_Over_Jamaica.jpg/1280px-Cumulus_Clouds_Over_Jamaica.jpg");
                }
                else if (iconName === '03d' || '03n') {
                    $("#image").attr("src", "https://pre00.deviantart.net/30aa/th/pre/f/2013/317/f/b/dark_rain_by_zyres-d6u4gcw.png");
                } else if (iconName === '04d' || '04n') {
                    //dark clouds
                    $("#image").attr("src", "https://static.pexels.com/photos/557782/pexels-photo-557782.jpeg");
                } else if (iconName === '09d' || '09n') {
                    $("#image").attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Cumulus_Clouds_Over_Jamaica.jpg/1280px-Cumulus_Clouds_Over_Jamaica.jpg");
                } else if (iconName === '10d' || '10n') {
                    $("#image").attr("src", "https://tctechcrunch2011.files.wordpress.com/2015/08/clouds.jpg");
                } else if (iconName === '11d' || '11n') {
                    //dark clouds
                    $("#image").attr("src", "https://static.pexels.com/photos/557782/pexels-photo-557782.jpeg");
                }
            },
            convertKelvinToCelcius: function (deg) {
                return Math.round(parseInt(deg) - 273.15);
            },
            convertKelvinToFahrenheit: function (deg) {
                return Math.round(parseInt(deg) * (9 / 5) - 459.67);
            },
            apiUrl: function (latitude, longitude) {
                return `${this.baseURL}?lat=${latitude}&lon=${longitude}&appid=${this.apiKEY}`;
            },
            reload:function() {
                vm.$forceUpdate();
            }
        }
    })
})();