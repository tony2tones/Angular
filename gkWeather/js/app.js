new Vue({
    el: '#data',
    data: {
        locationDetails:  {
                message: 'Hello guuys',
                weatherType: '',
                cTemp: '',
                kTemp: '',
                fTemp: ''
            },

        errorMessage: true
    },

    mounted: function () {
        this.location();
    },

    methods: {
        location: function () {
            $(document).ready(function () {
                var lon;
                var lat;
                if (navigator.geolocation) {
                    var gl = navigator.geolocation;
                    gl.getCurrentPosition(function (position) {
                        lat = position.coords.latitude;
                        lon = position.coords.longitude;
                        var key = '53f9d8e4213222cf517d86dc406d67fc';
                        var api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key;

                        $.getJSON(api, function (data) {
                            weatherType = data.weather[0].description;
                            // this.weatherType.push(locationDetails.weatherType);
                            kTemp = data.main.temp;
                            // convert(kTemp);
                            fTemp = (kTemp) * (9 / 5) - 459.67;
                            fTemp = parseFloat(fTemp).toFixed(0);
                            console.log(fTemp);
                            console.log(kTemp);
                            console.log(weatherType);
                            this.errorMessage = false;
                            $("#weather").html("weather type: " + weatherType + ' ' + kTemp + ' ');
                        });
                    });
                }
            });

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



