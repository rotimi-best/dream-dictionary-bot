`use strict`;

// Dream dictionary bot
const Telegram = require("telegram-node-bot");
const { TextCommand, RegexpCommand } = Telegram;
require("dotenv").config();
const TextCommand = Telegram.TextCommand;

const bot = new Telegram.Telegram(process.env.API_KEY, {
  workers: 1,
  webAdmin: {
    port: 8081,
    host: "127.0.0.1"
  }
});

module.exports = bot;

const OtherwiseController = require("./controllers/otherwiseController");
const BrainController = require("./controllers/brainController");
const DictionaryController = require("./controllers/dictionaryController");
const CallbackQueryController = require("./callbackQueries");

bot.router.callbackQuery(new CallbackQueryController());

bot.router
  .when(new TextCommand("💾 Save", "saveCommand"), new BrainController())
  .when(
    new TextCommand("🔎 Search", "wordSearchCommand"),
    new BrainController()
  )
  .when(
    new RegexpCommand(/\/[a-z A-Z]+/, "wordSearchCommand"),
    new BrainController()
  )
  .when(
    new TextCommand("🔎 Find By Alphabet 🔤", "alphSearchCommand"),
    new BrainController()
  )
  .when(
    new TextCommand("📝 Spell Checker", "spellCheckerCommand"),
    new DictionaryController()
  )
  .when(
    new TextCommand("📚 Synonym", "synonymCommand"),
    new DictionaryController()
  )
  .when(new TextCommand("🔑 Help", "helpCommand"), new BrainController())
  .when(
    new TextCommand("🗣👂 Feedback", "feedbackCommand"),
    new BrainController()
  )
  .when(new TextCommand("/start", "startCommand"), new BrainController())
  .when(new TextCommand("/test", "testCommand"), new BrainController())
  .otherwise(new OtherwiseController());
