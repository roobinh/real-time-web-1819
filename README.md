# Real-Time Web @cmda-minor-web · 2018-2019
_Tijdens het vak real-time-web gaan we leren hoe we een real-time / live applicatie opzetten. We leren hierbij technieken om een open connectie tussen server en client op te zetten, waarin deze via sockets realtime data met elkaar kunnen delen._

**Product:**
Een Realtime Discord-Bot!

<img src="https://i.ibb.co/9Nr7VZG/image.png">


[Klik hier](https://real-time-app-rh1819.herokuapp.com/) om de bot op te starten.

## Table of Content
1. Installatie
2. Product
3. Gebruikte API's
4. Data Life Cycle
5. 


## Hoofdstuk 1 |  Installatie
Clone het project
```
> git clone https://github.com/roobinh/real-time-web-1819

> cd real-time-web-1819
```

Installeer packages
```
> npm init
```

Start de server
```
> npm start
```

## Hoofdstuk 2 | Het product
Discord is de nieuwe Skype. Bij Discord is het mogelijk om een eigen server aan te maken, waarin je alles kan personaliseren zo veel als je zelf wilt. Zo kan je bijvoorbeeld verschillende chat- en spraakkanalen aanmaken, mensen verschillende rechten geven of een bot toevoegen!

Zoals eerder benoemd heb ik een real-time Discord Bot gemaakt. De bot draait op node.js, en is verbonden met de Discord servers via sockets. Alle berichten die op mijn server binnenkomen, worden dan automatisch doorgestuurd naar de Discord-Bot. Die gaat vervolgens kijken of hij actie moet ondernemen.

<img src="https://i.ibb.co/D9SVfYv/image.png">

Er zijn 3 verschillende commands waar je gebruik van kan maken, namelijk:

**1. joke** - 
Bij het command joke wordt er een joke opgehaald uit de JOKE API. Deze Joke wordt vervolgens teruggestuurd in de chat.

<img src="https://i.ibb.co/HY2xp5p/image.png">

**2. lvl** - 
Bij het command lvl is een parameter required. Deze parameter is de naam van het account waarvan je het account level op wilt zoeken. Dit zoekt die vervolgens op in de RIOT API, en stuurt die weer terug in de chat.

<img src="https://i.ibb.co/z29KzzY/image.png">

**3. weather** - Bij het command weather wordt de huidige temperatuur in Amsterdam teruggestuurd. Wil je een andere plek weten? Typ dan de naam van deze stad achter de query.

<img src="https://i.ibb.co/NpJs7h1/image.png">

## Hoofdstuk 3 | API's

Ik maak gebruik van 3 verschillende API's:

[1. RIOT API](https://developer.riotgames.com/)

Limits:
- 20 requests every 1 second
- 100 requests every 2 minutes
- Voor specifiekere data is een developer account nodig.

[2. JOKE API](http://www.icndb.com/api/)

Limits:
- Omdat er bij deze API geen gebruik wordt gemaakt van een API-key zijn er ook geen rate limits.

[3. YAHOO API](https://developer.yahoo.com/weather/)

Limits:
- 100 requests every minute

## Hoofdstuk 4 | Data Lifecycle
Hieronder de data life cycle van een '!weather' request!

<img src="https://i.ibb.co/zQS1g81/image.png">

<details>
<summary>Recieve Message</summary>
<br>
<img src="https://i.ibb.co/fDXJM1t/image.png">
</details>

<details>
<summary>Check if message is command (really easy to expand)</summary>
<br>
<img src="https://i.ibb.co/M7mmxZ9/image.png">
</details>

<details>
<summary>Get Request (YAHOO)</summary>
<br>
<img src="https://i.ibb.co/mBkPtmc/image.png">
</details>

<details>
<summary>Data ontvangen van Yahoo API</summary>
<br>

{
    location:{
       woeid:727232,
       city:'Amsterdam',
       region:' NH',
       country:'Netherlands',
       lat:52.373119,
       long:4.89319,
       timezone_id:'Europe/Amsterdam'
    },
    current_observation:{
       wind:{
          chill:10,
          direction:115,
          speed:21
       },
       atmosphere:{
          humidity:66,
          visibility:16.1,
          pressure:1026,
          rising:0
       },
       astronomy:{
          sunrise:'6:42 am',
          sunset:'8:40 pm'
       },
       condition:{
          text:'Cloudy',
          code:26,
          temperature:12
       },
       pubDate:1555322400
    },
    forecasts:[
       {
          day:'Mon',
          date:1555279200,
          low:3,
          high:15,
          text:'Partly Cloudy',
          code:30
       },
       {
          day:'Tue',
          date:1555365600,
          low:5,
          high:16,
          text:'Partly Cloudy',
          code:30
       },
       {
          day:'Wed',
          date:1555452000,
          low:7,
          high:15,
          text:'Mostly Cloudy',
          code:28
       },
       {
          day:'Thu',
          date:1555538400,
          low:8,
          high:20,
          text:'Mostly Sunny',
          code:34
       },
       {
          day:'Fri',
          date:1555624800,
          low:9,
          high:21,
          text:'Sunny',
          code:32
       },
       {
          day:'Sat',
          date:1555711200,
          low:9,
          high:20,
          text:'Mostly Sunny',
          code:34
       },
       {
          day:'Sun',
          date:1555797600,
          low:9,
          high:19,
          text:'Mostly Sunny',
          code:34
       },
       {
          day:'Mon',
          date:1555884000,
          low:10,
          high:18,
          text:'Breezy',
          code:23
       },
       {
          day:'Tue',
          date:1555970400,
          low:10,
          high:16,
          text:'Scattered Showers',
          code:39
       },
       {
          day:'Wed',
          date:1556056800,
          low:9,
          high:16,
          text:'Showers',
          code:11
       }
    ]
 }

</details>

<details>
<summary>Datamanipulatie</summary>
<br>
<img src="https://i.ibb.co/rM6Rg1K/image.png">
</details>

<details>
<summary>Send Message</summary>
<br>
<img src="https://i.ibb.co/fDXJM1t/image.png">
</details>




