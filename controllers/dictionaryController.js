"use strict";

const Telegram = require("telegram-node-bot");
const TelegramBaseController = Telegram.TelegramBaseController;

const thesaurus = require("thesaurus-synonyms");
// const got = require('got');
const dictionary = require("dictionary-en-us");
const nspell = require("nspell");
const telegramBot = require("../index.js");
const myChatId = "380473669";

const emojis = {
  success: "🕺",
  smile: "🙂",
  sad: "😞",
  coolGlasses: "😎",
  oneEye: "😉",
  spellChecker: "📝",
  help: "🔑",
  byAlphabet: "🔤",
  search: "🔎",
  synonym: "📚",
  chat: "🗣👂",
  fingerRight: "👉",
  save: "💾",
  fingerDown: "👇"
};

const stickers = {
  waitingSticker: "CAADAgADPQgAAnlc4gkSO7rndkwKigI"
};

class DictionaryController extends TelegramBaseController {
  /**
   * @param {Scope} $
   */
  spellCheckerHandler($, text) {
    let user = $.message.chat.firstName || $.message.chat.lastName;
    let userId = $.message.chat.id;
    let msg = text ? text : $.message.text;
    let word = msg
      .split(" ")
      .slice(1)
      .join(" ");

    if (msg == "📝 Spell Checker") {
      $.sendMessage(
        `*Send me the WORD you want to check its spelling.*\n\nI am waiting...${
          emojis.smile
        }`,
        { parse_mode: "Markdown" }
      );
      //$.sendSticker(`${waitingSticker}`);
      $.waitForRequest.then($ => {
        word = $.message.text;
        if (word.length > 1 && word.match(/[a-z]/i)) {
          this.spellCheckerLogic($, word, user, userId);
        } else {
          $.sendMessage(
            `Sorry your input is invalid, make sure you typed in english and its not a number.`,
            { parse_mode: "Markdown" }
          );
          telegramBot.api.sendMessage(
            myChatId,
            `InvalidInputError[/spellchecker] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`
          );
        }
      });
    } else if (word.length > 1 && word.match(/[a-z]/i)) {
      //Logic to suggest
      this.spellCheckerLogic($, word, user, userId);
    } else {
      //Sorry your word is invalid
      $.sendMessage(
        `Sorry your input is invalid, make sure you typed in english and its not a number.`,
        { parse_mode: "Markdown" }
      );
      telegramBot.api.sendMessage(
        myChatId,
        `InvalidInputError[/spellchecker] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`
      );
    }
    // $.sendMessage(`For now this functionality is still in production, in few days it should be ready. Thank you`, { parse_mode: "Markdown"})
  }

  /**
   * @param {Scope} $
   */
  synonymHandler($, text) {
    let user = $.message.chat.firstName
      ? $.message.chat.firstName
      : $.message.chat.lastName;
    let userId = $.message.chat.id;
    let msg = text ? text : $.message.text;
    let word = msg
      .split(" ")
      .slice(1)
      .join(" ");

    if (msg == "📚 Synonym") {
      $.sendMessage(
        `Send me the WORD you want to check its synonym. ${emojis.smile}`,
        { parse_mode: "Markdown" }
      );
      //$.sendSticker(`${waitingSticker}`);
      $.waitForRequest.then($ => {
        word = $.message.text;
        if (word.length > 1 && word.match(/[a-z]/i)) {
          this.findSynonymLogic($, word, user, userId);
        } else {
          $.sendMessage(
            `Sorry your input is invalid, make sure you typed in english and its not a number.`,
            { parse_mode: "Markdown" }
          );
          telegramBot.api.sendMessage(
            myChatId,
            `InvalidInputError[/synonym] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${word}`
          );
        }
      });
    } else if (word.length > 1 && word.match(/[a-z]/i)) {
      //Logic to suggest
      this.findSynonymLogic($, word, user, userId);
    } else {
      //Sorry your word is invalid
      $.sendMessage(
        `Sorry your input is invalid, make sure you typed in english and its not a number.`,
        { parse_mode: "Markdown" }
      );
      telegramBot.api.sendMessage(
        myChatId,
        `InvalidInputError[/synonym] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`
      );
    }
  }

  get routes() {
    return {
      spellCheckerCommand: "spellCheckerHandler",
      synonymCommand: "synonymHandler"
    };
  }

  spellCheckerLogic($, word, user, userId) {
    let spellChecker = (error, dict) => {
      if (error) {
        telegramBot.api.sendMessage(
          myChatId,
          `ApiError[/spellchecker] =>\nUsername: ${user}\nUserId: ${userId}\nMsg: ${error}`
        );
      }
      const spellObj = nspell(dict);
      let correct = spellObj.correct(word);

      if (correct) {
        //Your value is correct
        $.sendMessage(
          `Hey ${user}, your spelling is correct ${
            emojis.smile
          }, go ahead and find the meaning of the word\n\n1. Open the *MENU* (_The ICON on the top-right of your keyboard_),\n2. Click Search \n3. Enter the word: *${word}*`,
          { parse_mode: "Markdown" }
        );
        telegramBot.api.sendMessage(
          myChatId,
          `User ${user} is using the spellCheckerHandler, but no suggestion for word: ${word}`
        );
      } else {
        //Your word is not correct
        let suggestions = spellObj.suggest(word);
        if (Array.isArray(suggestions) && suggestions.length > 1) {
          $.sendMessage(
            this._serializeList(user, word, suggestions, "spellchecker"),
            { parse_mode: "Markdown" }
          );
          telegramBot.api.sendMessage(
            myChatId,
            `User ${user} just used the spellChecker for the word ${word}`
          );
        } else if (Array.isArray(suggestions) && suggestions.length === 1) {
          $.sendMessage(
            `Hey ${user}, ${word} is incorrect ${
              emojis.sad
            }. I got a suggestion${emojis.oneEye} for you:\n\n${
              emojis.fingerRight
            } ${
              suggestions[0]
            }.\n\nTo find the meaning of the word by \n1. Opening the *MENU* (_The ICON on the top-right of your keyboard_),\n2. Click Search \n3. Enter the suggestion: *${
              suggestions[0]
            }*`,
            { parse_mode: "Markdown" }
          );
          telegramBot.api.sendMessage(
            myChatId,
            `User ${user} used the spellChecker for the word ${word}`
          );
        } else {
          $.sendMessage(
            `Unfortunately ${user}, that word isn't correct and I don't have any suggestion for you ${
              emojis.sad
            }.\n\nSince you are human you can correct it yourself${
              emojis.oneEye
            }.`
          );
          telegramBot.api.sendMessage(
            myChatId,
            `InvalidInputError[/spellchecker] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${suggestions}`
          );
        }
      }
    };
    dictionary(spellChecker);
  }

  findSynonymLogic($, word, user, userId) {
    // got('https://api.datamuse.com/words?ml=jeep', { json: true }).then(response => {
    //     //console.log(response.body.url);
    //     response.body.forEach((res) => {console.log(res.word)});
    //     }).catch(error => {
    //     console.log(error.response.body);
    // });
    thesaurus.similar(word).then(
      synonyms => {
        if (Array.isArray(synonyms) && synonyms.length > 1) {
          $.sendMessage(this._serializeList(user, word, synonyms, "synonym"), {
            parse_mode: "Markdown"
          });
          telegramBot.api.sendMessage(
            myChatId,
            `User ${user} just used the synonymFunc for the word ${word}`
          );
        } else if (Array.isArray(synonyms) && synonyms.length === 1) {
          $.sendMessage(
            `Hey ${user}, I've got a synonym for you ${emojis.oneEye}:\n\n${
              emojis.fingerRight
            } ${
              synonyms[0]
            }.\n\nTo find the meaning of the word by \n\n1. Opening the *MENU* (_The ICON on the top-right of your keyboard_),\n2. Click Search \n3. Enter the word: ${
              synonyms[0]
            }`,
            { parse_mode: "Markdown" }
          );
          telegramBot.api.sendMessage(
            myChatId,
            `User ${user} used the synonymFunc for the word ${word}`
          );
        } else {
          $.sendMessage(
            `Unfortunately ${user}, that word isn't correct and I don't have any synonym for you ${
              emojis.sad
            }.\n\nSince you are human you can correct it yourself${
              emojis.oneEye
            }.`
          );
          telegramBot.api.sendMessage(
            myChatId,
            `InvalidInputError[/synonym] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${synonyms}`
          );
        }
      },
      error => {
        telegramBot.api.sendMessage(
          myChatId,
          `ApiError[/synonym] =>\nUsername: ${user}\nUserId: ${userId}\nMsg: ${error}`
        );
      }
    );
  }

  _serializeList(user, word, suggestions, func) {
    let serialized;
    if (func == "spellchecker") {
      serialized = `Hey ${user}, the word ${word} is incorrect ${
        emojis.sad
      }. I've got some suggestions for you: ${emojis.oneEye}\n\n`;
    } else if (func == "synonym") {
      serialized = `Hey ${user}, here are some synonyms for you: ${
        emojis.oneEye
      }\n\n`;
    }
    suggestions.forEach(suggestion => {
      serialized += `${emojis.fingerRight} ${suggestion
        .charAt(0)
        .toUpperCase() + suggestion.slice(1)}\n`;
    });
    serialized += `\nTo find the meaning of any of the word:\n1. Opening the *MENU* (_The ICON on the top-right of your keyboard_),\n2. Click Search \n3. Enter any of the above suggestions: *${suggestions[
      suggestions.length - 1
    ]
      .charAt(0)
      .toUpperCase() + suggestions[suggestions.length - 1].slice(1)}*`;
    return serialized;
  }
}

module.exports = DictionaryController;
