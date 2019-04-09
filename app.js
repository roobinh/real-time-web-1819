
var express = require('express');
var path = require('path');

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

    socket.emit('welcome', {welcome: 'to my socket'});

    //when chat is recieved, send message to all sockets
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    })
})
