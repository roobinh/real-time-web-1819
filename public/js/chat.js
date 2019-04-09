(() => {
    console.log("client.js imported.")

    window.onload = () => {
        // check if username exists
        if(myStorage.getItem('username') == null) {
            window.location.href = "/";
        }
    }

    // Socket.io
    console.log('making connection to host...')
    var socket = io();
    console.log('connected to host.')

    // Variables
    var form = document.getElementById("form");
    var output = document.getElementById('output');
    var message = document.getElementById('message');
    var clear = document.getElementById('clearmessages');
    var changeusername = document.getElementById('changeusername');

    var myStorage = window.localStorage;
    var username = myStorage.getItem('username')

    // send message
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        sendMessage(message.value, username);
        message.value = "";
    })

    // clear chat
    clear.addEventListener("click", () => {
        console.log("clearing messages")
        socket.emit('clear', '')
    })

    changeusername.addEventListener("click", () => {
        console.log("change username")
        myStorage.removeItem('username')
        window.location.href = "/";
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
        sendMessage("has joined the server!", username)
    })
    
    // send message made easy
    function sendMessage(message) {
        socket.emit('chat', {
            message: message,
            handle: username
        })
    }
})();   

