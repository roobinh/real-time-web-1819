
// requires
var express = require('express');
var path = require('path');
var Discord = require('discord.js')
var FetchStream = require('fetch').FetchStream
var OAuth = require('oauth');
var dotenv = require('dotenv');

// Setting up .env config
dotenv.config({
    path: './.env'
})

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
const discord_token = process.env.DISCORD_API_TOKEN;

// riot games
const riot_api_token = process.env.RIOT_API_TOKEN;

console.log('riot token = ' + process.env.RIOT_API_TOKEN);

// client
const client = new Discord.Client();

client.on('message', (msg) => {
    message.recieved(msg);
})

client.on('ready', () => {
    console.log("Bot is connected.")
})

client.login(discord_token);


// objects
const messages = {
    recieved: function(msg) {
        if(msg.member.user.username !== "discord-bot") {
            checkIfCommand(msg)
        }
    },
    send: function(msg, message) {
        newMessage = "```" + message + "```"
        msg.channel.send(newMessage)
    },

    error: function(msg, message) {
        newMessage = "```fix " + message + "```";
        msg.channel.send(newMessage);
    }
}

const commands = {
    joke: function(msg) {
        var url = "http://api.icndb.com/jokes/random"
        var fetch = new FetchStream(url);
        fetch.on('data', function(chunk) {
            const json = JSON.parse(chunk.toString());
            if(json.value.joke !== "") {
                message.send(msg, json.value.joke)
            }
        })
    },

    weather: function(msg) {
        var msgToArray = msg.content.split(' ');

        if(msgToArray.length == 1) {
            var stad = "Amsterdam"
        } else {
            var stad = msg.content.slice(9)
        }

        var header = {
            "X-Yahoo-App-Id": "8B56mn42"
        };
    
        var request = new OAuth.OAuth(
            null,
            null,
            'dj0yJmk9Q2ZxTHh1WXVNbGtCJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTUz',
            '98c6dd79297ccb87213d84bcdcc9ac89d5f27317',
            '1.0',
            null,
            'HMAC-SHA1',
            null,
            header
        );
        
        var city = stad.split(' ').join('%20')

        request.get(
            'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=' + city + ',nl&format=json&u=c',
            null,
            null,
            function (err, data, result) {
                if (err) {
                    console.log(err);
                } else {
                    var weatherData = JSON.parse(data)

                    if(weatherData['forecasts'].length > 0) {
                        var location = weatherData.location.city;
                        var temperature = weatherData.current_observation.condition.temperature;
                        
                        var mess = "Current temperature in " + location + " is " + temperature + " degrees celcius.";
    
                        message.send(msg, mess); 

                    } else {
                        message.send(msg, "Unknown city, please try another city")
                    }
                }
            }
        );        
    },

    help: function(msg) {
        var newMessage = "I am here to help, " + msg.member.user.username + ".  Try one of the following commands: !lvl, !joke";
        message.send(msg, newMessage);
    },

    lvl: function(msg) {
        var msgToArray = msg.content.split(' '); // ['!lvl', 'king', 'of', 'the', 'club']
        var summonerName = msg.content.slice(5); // king of the club

        if(msgToArray.length == 1) { // hele bericht: '!lvl'
            message.error(msg, 'Like this --> !poro {name here}')
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
    },
    user: function(msg) {

        var username = "tehrubin"
        var lvl = "59"
        var rank = "Platinum II"
        var winrate = "59"
        var main = "Katarina"
        var mainrole = "mid"

        var newMessage = 
        '------------------------------------------------' + 
        '| ' + username + '| ' + rank + '| Main: ' +main +'|' +
        '| lvl ' + lvl   + '|  Winrate: ' + winrate + '% | Main-Role: ' + mainrole + '|' +
        '-----------------------------------------------'

        message.send(msg, newMessage);

    }
}

// checks if message is a command
function checkIfCommand(msg) { 
    if(msg.content.slice(0,1) == "!") { // begint met uitroepteken
        var com = msg.content.split(' ')[0].slice(1) //"!help me" -> "help"

        switch(com) {
            case "help":
                command.help(msg)
                break;
            case "lvl":
                command.lvl(msg)
                break;
            case "joke":
                command.joke(msg)
                break;
            case "user":
                command.user(msg);
                break;
            case "weather":
                command.weather(msg);
                break;
            default:
                message.send(msg, 'Command not found.')
        }
    } else {
        console.log("message not starting with: '!'")
    }   
}

const message = Object.create(messages)
const command = Object.create(commands)
