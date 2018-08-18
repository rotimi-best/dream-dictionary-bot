`use strict`

            // Dream dictionary bot  
const Telegram = require('telegram-node-bot')
require('dotenv').config();
const TextCommand = Telegram.TextCommand
const bot = new Telegram.Telegram(process.env.API_KEY, {
    workers: 1,
    webAdmin: {
        port: 8081,
        host: '127.0.0.1'
    }
});
module.exports = bot;
const OtherwiseController = require('./controllers/otherwiseController')
const BrainController = require('./controllers/brainController')
const DictionaryController = require('./controllers/dictionaryController')

bot.router
    .when(new TextCommand('/findbyword', 'wordSearchCommand'), new BrainController())
    .when(new TextCommand('/findbyalphabet', 'alphSearchCommand'), new BrainController())
    .when(new TextCommand('/spellchecker', 'spellCheckerCommand'), new DictionaryController())
    .when(new TextCommand('/help', 'helpCommand'), new BrainController())
    .when(new TextCommand('/start', 'startCommand'), new BrainController())
    .otherwise(new OtherwiseController()) 


