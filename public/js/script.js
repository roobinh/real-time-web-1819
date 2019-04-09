console.log("script.js imported.")

// Socket.io
console.log('Making connection...')
var socket = io();
console.log('Connected.')

// Variables
var form = document.getElementById("form");
var chat = document.getElementById('chat');
var chatwindow = document.getElementById('chat-window');
var output = document.getElementById('output');
var handle = document.getElementById('handle');
var message = document.getElementById('message');
var send = document.getElementById('send');


form.addEventListener("submit", (e) => {
    e.preventDefault();

    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

socket.on('chat', function(data) {
    console.log("message recieved.");
    console.log(data)
    output.innerHTML += "<br>" + data.handle + ": " + data.message;
})

socket.on('welcome', function(data) {
    console.log(data);
})

