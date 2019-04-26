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
- Omdat er bij deze API geen gebruik wordt gemaakt van een API-key oid zijn er ook geen rate limits.

[3. YAHOO API](https://developer.yahoo.com/weather/)

Limits:
- 100 requests every minute

## Hoofdstuk 4 | Data Lifecycle

