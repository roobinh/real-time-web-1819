
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

app.use('/', indexRouter);
app.use('/path', pathRouter);

// Socket.io
io.on('connection', function(socket) {
    console.log("made socket connection with client...", socket.id)

    //Send Chat to client
    fs.readFile('./chats/chat1.json', (err, buffer) => {
        const json = JSON.parse(buffer.toString());
        socket.emit('chat', json)
    })

    //Welcome message when connecting
    socket.emit('welcome', {id: socket.id});

    //Message when someone disconnects
    socket.on('disconnect', function() {
        var data = {
            handle: socket.id,
            message: "disconnected"
        }

        io.sockets.emit('chat', data)
    })

    //when chat is recieved, send message to all sockets
    socket.on('chat', function(data){
        fs.readFile('./chats/chat1.json', (err, buffer) => {
            const json = JSON.parse(buffer.toString());

            if (err) throw err;

            if(data.message == "" || data.handle == "") {
                //no data to be added
            } else {
                //add new message to json
                const user = data.handle;
                const message = data.message;

                const jsonLength = Object.keys(json).length + 1;
                json[jsonLength] = user + ": " + message;

                fs.writeFile('./chats/chat1.json', JSON.stringify(json), (err) => {
                    if (err) throw err;
                    console.log("file has been saved!");
                })
                io.sockets.emit('chat', json);
            }
        })
    })

    socket.on('clear', () => {  
        console.log("Clearing Chat...")
        clearFile = {
            1: "SERVER: <i>Messages cleared</i>"
        }
        
        console.log("Writefile")
        fs.writeFile('./chats/chat1.json', JSON.stringify(clearFile), (err) => {
            if(err) throw err;
        })
       
        console.log('Readfile')
        fs.readFile('./chats/chat1.json', (err, buffer) => {
            const json = JSON.parse(buffer.toString());
            io.sockets.emit('chat', json);
        })
        console.log("Chat cleared!")
    })
})

// function messageToJSON(data) {
//     fs.readFile('./chats/chat1.json', (err, buffer) => {
//         if (err) throw err;

//         const json = JSON.parse(buffer.toString());
//         const user = data.handle;
//         const message = data.message;

//         const jsonLength = Object.keys(json).length + 1;
//         json[jsonLength] = user + ": " + message;

//         fs.writeFile('./chats/chat1.json', JSON.stringify(json), (err) => {
//             if (err) throw err;
//             console.log("file has been saved!");
//         })
    // })
    
// }
