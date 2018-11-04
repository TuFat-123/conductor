$( document ).ready(function() {

    const connection = new WebSocket('ws://localhost:9000');

    connection.onopen = function () {
        let message = 'BROADCASTER CONNECTED';
        console.log(message);
    };

    // Log errors
    connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
            .then(success, failure);
    }
    function success (midi) {
        let inputs = midi.inputs.values();
        // inputs is an Iterator
        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            // each time there is a midi message call the onMIDIMessage function
            input.value.onmidimessage = onMIDIMessage;
        }
    }
    function failure () {
        console.error('No access to your midi devices.')
    }

    function onMIDIMessage (message) {
        console.log("DATA FROM MIDI-DEVICE", message.data[0], message.data[1], message.data[2]);
        if (message.data[0] === 144 && message.data[1] >= 60 && message.data[1] <= 67) {
            let selectionStartNote = 60;
            let selectionNote = message.data[1];
            console.log(selectionNote - selectionStartNote);
            const commandItems = document.querySelectorAll('.command-item');
            commandItems[selectionNote - selectionStartNote].classList.add('selected');
            let stringToSend = commandItems[selectionNote - selectionStartNote].dataset.command;
            console.log(stringToSend);
            connection.send(stringToSend);
        }
    }
});