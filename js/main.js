// JAVASCRIPT

document.addEventListener("DOMContentLoaded", init);

function init() {
    if (navigator.geolocation) {
        showMap();
    } else {
        showError();
    }
}

function showMap() {
    var params = {enableHighAccuracy: true, timeout:3600, maximumAge:0};
    navigator.geolocation.getCurrentPosition(reportPosition, gpsError, params);
    
    var img = document.createElement('img');
    img.addEventListener('load', drawCanvas);

    function drawCanvas() {
        var canvas = document.querySelector('#canvas'),
            context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
    }

    function reportPosition(position) {
        var lat = position.coords.latitude,
            long = position.coords.longitude,
            source = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + ',' + long + '&zoom=14&size=400x400&markers=color:blue%7C' + lat + ',' + long;
        var body = document.getElementById('theBody'),
            newFrag = document.createDocumentFragment(),
            newCanvas = '',
            wrapper = "",
            header = "";

        wrapper = document.createElement('div');
        wrapper.setAttribute('id', '#wrapper')
        header = document.createElement('h1');
        header.textContent = 'MAD9022: Geolocation & Canvas';

        newCanvas = document.createElement('canvas'),
        newCanvas.setAttribute('id', 'canvas');
        newCanvas.setAttribute('width', '400px');
        newCanvas.setAttribute('height', '400px');

        wrapper.appendChild(header);
        wrapper.appendChild(newCanvas);
        newFrag.appendChild(wrapper);
        
        body.appendChild(newFrag);
        img.setAttribute('src', source);
        img.setAttribute('id', 'map');
    }
}

function showError(){
    alert('Location services not supported');
}

function gpsError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
}

