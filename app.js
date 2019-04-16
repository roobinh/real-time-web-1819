
// requires
var express = require('express');
var path = require('path');
var Discord = require('discord.js')
var FetchStream = require('fetch').FetchStream

// server setup
var app = express();
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
const allCommands = ["poro", "help", "lvl"]
const client = new Discord.Client();

// riot games
const riot_api_token = 'RGAPI-ab0206c4-ecb6-42ff-85c5-5e32c04efdef';

client.on('message', (msg) => {
     message.recieved(msg);
})

client.on('ready', () => {
    console.log("Bot is connected.")
})

client.login(token);

const messages = {
    recieved: function(msg) {
        if(msg.member.user.username !== "discord-bot") {
            checkIfCommand(msg)
        }
    },

    send: function(msg, message) {
        msg.channel.send(message)
    }
}

const commands = {
    help: function(command, msg) {

    },

    poro: function(command, msg) {

    },

    lvl: function(command, msg) {
        var msgToArray = msg.content.split(' '); // ['!lvl', 'king', 'of', 'the', 'club']
        var summonerName = msg.content.slice(5); // king of the club

        if(msgToArray.length == 1) { // hele bericht: '!lvl'
            message.send(msg, 'No name defined: !poro {name here}')
        } else {
            if(msgToArray.length == 2) {
                var name = summonerName; // name to look up
            } else {
                var name = summonerName.split(' ').join('%20') // king%20of%20the%club
            }

            var url = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name + "?api_key=" + riot_api_token;
            var fetch = new FetchStream(url)
            fetch.on("data", function(chunk) {
                const json = JSON.parse(chunk.toString());

                if(json.summonerLevel == undefined) {
                    message.send(msg, 'Summoner not found.')
                } else {
                    var temp = summonerName + " level: " + json.summonerLevel
                    message.send(msg, temp)
                } 
            })
        }
    }
}

// checks if message is a command
function checkIfCommand(msg) { 
    if(msg.content.slice(0,1) == "!") { // begint met uitroepteken
        var com = msg.content.split(' ')[0].slice(1) //"!help me" -> "help"
        if(allCommands.includes(com)) { //check if command is a known command

            switch(com) {
                case "help":
                    break;
                case "poro":
                    //code
                    break;
                case "lvl":
                    command.lvl(command, msg)
                    break;
            }

        } else {
            message.send(msg, 'Command not found.')
        }
    } else {
        console.log("not a command.")
    }   
}

const message = Object.create(messages)
const command = Object.create(commands)
