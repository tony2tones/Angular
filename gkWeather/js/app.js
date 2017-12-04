$(document).ready(function () {
    var lon;
    var lat;
    if (navigator.geolocation) {
        var gl = navigator.geolocation;
        gl.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            var key = '53f9d8e4213222cf517d86dc406d67fc';
            var api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key + '&mode=json&units=metric';

            $.getJSON(api, function (data) {
                var weatherType = data.weather[0].description;
                var temp = data.main.temp;
                console.log(temp);
                console.log(weatherType);

                $("#data").html("weather type: " + weatherType + ' ' + temp);
            });
        });
    }
});

