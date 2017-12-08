import Vue from 'vue';

(() => {
    new Vue({
        el: '#data',
        data: {
            message: 'Hello guuys',
            errorMessage: false,
            loading: false,
            imageLink: 'http://weclipart.com/gimg/CA61722230C10362/KcnEpgKcq.jpeg',
            apiKEY: '53f9d8e4213222cf517d86dc406d67fc',
            baseURL: 'http://api.openweathermap.org/data/2.5/weather',
            src: '',
            weather: {
                cTemp: '--',
                fTemp: '--',
                weatherNiceName: '--',
                cTempMin: '--',
                cTempMax: '--',
                fTempMin: '--',
                fTempMax: '--',
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
                var self = this;
                if (iconName === '01d' || iconName === '01n') {
                    self.imageLink = "http://mikeiamele.com/wp-content/uploads/2014/05/Sunny-Day-800x450.jpg";
                } else if (iconName === '02d' || iconName === '02n') {
                    self.imageLink = "https://www.newvision.co.ug/w-images/6f544bf7-4a4a-46a0-be3d-f656bd88bd48/1/cloudy-703x422.jpg";
                } else if (iconName === '03d' || iconName === '03n') {
                    self.imageLink = "https://i.ytimg.com/vi/rRL_9WxBJBc/maxresdefault.jpg";
                } else if (iconName === '04d' || iconName === '04n') {
                    self.imageLink = "http://cdn.pcwallart.com/images/dark-clouds-wallpaper-4.jpg";
                } else if (iconName === '09d' || iconName === '09n') {
                    self.imageLink = "https://pbs.twimg.com/media/CJb-mE_VEAAu-WB.jpg";
                } else if (iconName === '10d' || iconName === '10n') {
                    self.imageLink = "https://tctechcrunch2011.files.wordpress.com/2015/08/clouds.jpg";
                } else if (iconName === '11d' || iconName === '11n') {
                    self.imageLink = "https://pbs.twimg.com/media/CfvNkjbWsAATGV8.jpg";
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
            }
        }
    })
})();

