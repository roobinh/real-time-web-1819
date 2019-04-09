
var express = require('express');
var path = require('path');
var fs = require('fs')

var app = express();
var socket = require('socket.io')

var port = process.env.PORT || 2100
var server = app.listen(port, () => console.log(`App running, listening on port ${port}!`))

var io = socket(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routers
var indexRouter = require('./routes/index');
var pathRouter = require('./routes/path');
var chatRouter = require('./routes/chat')

app.use('/', indexRouter);
app.use('/path', pathRouter);
app.use('/chat', chatRouter)

// Socket.io
io.on('connection', function(socket) {
    console.log("made socket connection with client...", socket.id)

    // refresh chat on load
    refreshClientChat();

    // welcome message when connecting
    socket.emit('welcome', {id: socket.id});

    // message when someone disconnects
    socket.on('disconnect', function() {
        addMessage(socket.id, "has disconnected")
    })

    // when chat is recieved, send message to all sockets
    socket.on('chat', function(data){
        addMessage(data.handle, data.message);
    })
    
    // clear chat
    socket.on('clear', () => {  

        clearFile = {
            1: "SERVER: <i>Messages cleared</i>"
        }
        
        console.log("Clearing Chat...")
        fs.writeFile('./chats/chat1.json', JSON.stringify(clearFile), (err) => {
            if(err) throw err;
        })
        console.log("Chat Cleared")

        refreshClientsChat();
    })

    // add message to json
    function addMessage(user, message) {
        fs.readFile('./chats/chat1.json', (err, buffer) => {
            if (err) throw err;

            const json = JSON.parse(buffer.toString());
            const date = new Date();
            const timestamp = "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "]" 

            if(user == "" || message == "") {
                console.log("username or message undefined")
            } else {
                //add new message to json
                const jsonLength = Object.keys(json).length + 1;
                json[jsonLength] = timestamp + " " + user + ": " + message;

                fs.writeFile('./chats/chat1.json', JSON.stringify(json), (err) => {
                    if (err) throw err;
                    console.log("Message has been added to JSON file!");
                })
                io.sockets.emit('chat', json);
            }
        })
    }

    function refreshClientChat() {
        // send chat to client
        fs.readFile('./chats/chat1.json', (err, buffer) => {
            const json = JSON.parse(buffer.toString());
            socket.emit('chat', json)
        })
    }

    function refreshClientsChat() {
        //send chat to clients
        fs.readFile('./chats/chat1.json', (err, buffer) => {
            const json = JSON.parse(buffer.toString());
            io.sockets.emit('chat', json)
        })
    }

})