(() => {
    console.log("script.js imported.")

    // Socket.io
    console.log('Making connection...')
    var socket = io();
    console.log('Connected.')

    // Variables
    var form = document.getElementById("form");
    var output = document.getElementById('output');
    var handle = document.getElementById('handle');
    var message = document.getElementById('message');

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        sendMessage(message.value, handle.value);
    })

    socket.on('chat', function(data) {
        console.log("message recieved.");
        console.log(data)
        output.innerHTML += "<br>" + data.handle + ": " + data.message;
    })

    socket.on('welcome', function(data) {
        console.log(data);
    })

    function sendMessage(message, handle) {
        socket.emit('chat', {
            message: message,
            handle: handle
        })
    }
})();   

