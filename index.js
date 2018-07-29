`use strict`

            // Dream dictionary bot  
const Telegram = require('telegram-node-bot')
require('dotenv').config();
const TextCommand = Telegram.TextCommand
const bot = new Telegram.Telegram(process.env.API_KEY, {
    workers: 1
});

const http = require('http');
const express = require('express');
const app = express();

const OtherwiseController = require('./controllers/otherwiseController')
const BrainController = require('./controllers/brainController')
const DictionaryController = require('./controllers/dictionaryController')

app.get("index.js/", (request, response) => {
    response.send(Date.now() + " Ping Received");
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
  });
  app.listen(process.env.PORT, () => console.log('Server started'));
  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  }, 280000);

bot.router
    .when(new TextCommand('/findbyword', 'wordSearchCommand'), new BrainController())
    .when(new TextCommand('/findbyalphabet', 'alphSearchCommand'), new BrainController())
    .when(new TextCommand('/spellchecker', 'spellCheckerCommand'), new DictionaryController())
    .when(new TextCommand('/help', 'helpCommand'), new BrainController())
    .when(new TextCommand('/start', 'startCommand'), new BrainController())
    .otherwise(new OtherwiseController()) 


