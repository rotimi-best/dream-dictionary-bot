`use strict`

            // Dream dictionary bot  
const Telegram = require('telegram-node-bot')
require('dotenv').config();
const TextCommand = Telegram.TextCommand
const bot = new Telegram.Telegram(process.env.API_KEY, {
    workers: 1
});

const OtherwiseController = require('./controllers/otherwiseController')
const BrainController = require('./controllers/brainController')

bot.router
    .when(new TextCommand('/findbyword', 'wordSearchCommand'), new BrainController())
    .when(new TextCommand('/findbyalphabet', 'alphSearchCommand'), new BrainController())
    .when(new TextCommand('/spellchecker', 'spellCheckerCommand'), new BrainController())
    .when(new TextCommand('/help', 'helpCommand'), new BrainController())
    .when(new TextCommand('/start', 'startCommand'), new BrainController())
    .otherwise(new OtherwiseController()) 


