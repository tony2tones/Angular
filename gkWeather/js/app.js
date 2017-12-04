$(document).ready(function () {
    var lon;
    var lat;
    if (navigator.geolocation) {
        var gl = navigator.geolocation;
        gl.getCurrentPosition(function (position) {
            $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        });
    }
    //http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&
    var key = '53f9d8e4213222cf517d86dc406d67fc';
    var api = 'http://api.openweathermap.org/data/2.5/weather?' + 'lat=&' + lat + 'lon=&' + lon + '&appid=' + key;

    $.getJSON(api, function (data) {
        alert(data.coord.lon);
    });

});