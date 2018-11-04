$( document ).ready(function() {

    const connection = new WebSocket('ws://localhost:9000');

    connection.onopen = function () {
    };

    connection.onmessage = function (e) {
        console.log('Received from Server: ' + e.data);
        $('#text').text(e.data);
    };
    // Log errors
    connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };
});