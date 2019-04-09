(() => {
    console.log("client.js imported.")

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

    // send message
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        sendMessage(message.value, handle.value);
    })

    // clear chat
    clear.addEventListener("click", () => {
        console.log("clearing messages")
        socket.emit('clear', '')
    })

    // load chat
    socket.on('chat', function(data) {
        output.innerHTML = "";

        for(var i = 1; i <= Object.keys(data).length; i++) {
            var value = data[i];
            output.innerHTML += value + "<br>";
        }
    })

    // when user joins server
    socket.on('welcome', function(data) {
        console.log(data)
        sendMessage("has joined the server!", data.id)
    })
    
    // send message made easy
    function sendMessage(message, handle) {
        socket.emit('chat', {
            message: message,
            handle: handle
        })
    }
})();   

