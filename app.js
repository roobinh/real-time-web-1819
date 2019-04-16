
// requires
var express = require('express');
var path = require('path');
var Discord = require('discord.js')

var app = express();
var socket = require('socket.io')

// server setup
var port = process.env.PORT || 2100
var server = app.listen(port, () => console.log(`App running, listening on port ${port}!`))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routers
var Router = require('./routes/index');
app.use('/', Router);

// discord
const token = 'NTY3NjQyNjM0NTQ2NDQ2MzU2.XLWl7g.LES8YuJd7W61Nlj5H5ZiwPQHMtI'
const client_id = '567642634546446356';

const client = new Discord.Client();

client.on('ready', () => {
    console.log("Bot is connected.")
})

client.login(token);