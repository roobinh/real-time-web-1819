(() => {
    console.log("script.js imported.")

    // Socket.io
    console.log('making connection to host...')
    var socket = io();
    console.log('connected to host.')

    // Variables
    var form = document.getElementById("form");
    var output = document.getElementById('output');
    var handle = document.getElementById('handle');
    var message = document.getElementById('message');
    var clear = document.getElementById('clearmessages')

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        sendMessage(message.value, handle.value);
    })

    clear.addEventListener("click", () => {
        console.log("clearing messages")
        socket.emit('clear', '')
    })

    socket.on('chat', function(data) {
        output.innerHTML = "";

        for(var i = 1; i <= Object.keys(data).length; i++) {
            var value = data[i];
            output.innerHTML += value + "<br>";
        }
    })

    socket.on('welcome', function(data) {
        console.log(data)
        sendMessage("has joined the server!", data.id)
    })

    function sendMessage(message, handle) {
        socket.emit('chat', {
            message: message,
            handle: handle
        })
    }
})();   

