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

try{
  const OtherwiseController = require('./controllers/otherwiseController')
  const BrainController = require('./controllers/brainController')
  const DictionaryController = require('./controllers/dictionaryController')

  bot.router
      .when(new TextCommand('💾 Save', 'saveCommand'), new BrainController())
      .when(new TextCommand('🔎 Search', 'wordSearchCommand'), new BrainController())
      .when(new TextCommand('🔎 Search By Alphabet 🔤', 'alphSearchCommand'), new BrainController())
      .when(new TextCommand('📝 Spell Checker', 'spellCheckerCommand'), new DictionaryController())
      .when(new TextCommand('📚 Synonym', 'synonymCommand'), new DictionaryController())
      .when(new TextCommand('🔑 Help', 'helpCommand'), new BrainController())
      .when(new TextCommand('/start', 'startCommand'), new BrainController())
      .otherwise(new OtherwiseController()) 
  
} catch(error){
  bot.api.sendMessage(process.env.CHAT_ID, `Someone is sending spam to your bot. Here is the msg ${error}`)
  console.log('Someone is sending spam to your bot. Here is the msg', error)
}