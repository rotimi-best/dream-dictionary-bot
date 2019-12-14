"use strict";

const fs = require("fs");
const Telegram = require("telegram-node-bot");
const TelegramBaseController = Telegram.TelegramBaseController;

const lib = require("../text/libArray");
const DictionaryController = require("./dictionaryController");
let dictionary = new DictionaryController();

const { ALPHABETS } = require("../helpers/constants");
const { editWordOrPageQA, generateMeaning } = require("../modules");
const bot = require("../index.js");
const { api: API } = bot;

const { ADMIN } = process.env;

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
  fingerDown: "👇",
  byNumber: "🔢"
};

const stickers = {
  waitingSticker: "CAADAgADPQgAAnlc4gkSO7rndkwKigI",
  thanksStickerLionKing: "CAADAgADqQIAAs-71A5iOMlYXuwndQI"
};

class BrainController extends TelegramBaseController {
  /**
   * @param {Scope} $
   */
  saveHandler($) {
    $.sendMessage(
      `The save functionality is not ready yet. It should be anytime soon ${emojis.smile}`
    );
    let user = $.message.from.firstName
      ? $.message.from.firstName
      : $.message.from.lastName;
    let userId = $.message.chat.id;
    API.sendMessage(
      ADMIN,
      `Someone tried to save his dream\n\nUsername: ${user}\nUserId: ${userId}`
    );
  }

  /**
   * @param {Scope} $
   */
  wordSearchHandler($, command, wordSuggestedByBot = null) {
    const user = $.message.from.firstName || $.message.from.lastName;
    const userId = $.message.chat.id;
    const clickedCommand = (wordSuggestedByBot || command || $.message.text).replace(
      "@dream_dictionary_bot",
      ""
    ).replace(/^\//, "");


    if (clickedCommand === "start") {
      return;
    }

    if (clickedCommand == "🔎 Search") {
      let scope = $;
      $.runInlineMenu({
        layout: 2,
        method: "sendMessage",
        params: ["Do you want to search for a Word or a Page?"],
        menu: [
          {
            text: "Word",
            callback: query => {
              editWordOrPageQA(bot, "WORD", query);

              scope.waitForRequest.then($ => {
                const userReply = $.message.text.toLowerCase();

                if (userReply) {
                  this.findWordLogic($, userReply, user, userId);
                } else {
                  $.sendMessage(
                    `Sorry ${user} ${emojis.sad}, your input isn't valid. click /help for more info.`
                  );
                  API.sendMessage(
                    ADMIN,
                    `InvalidInputError[/findbyword] =>\nUsername: ${user}\nUserId: ${userId}\nInput: Invalid input`
                  );
                }
              });
            }
          },
          {
            text: "Page",
            callback: query => {
              editWordOrPageQA(bot, "PAGE", query);

              scope.waitForRequest.then($ => {
                const userReply = $.message.text.toLowerCase();
                if (userReply) {
                  this.findWordLogic($, userReply, user, userId);
                } else {
                  $.sendMessage(
                    `Sorry ${user} ${emojis.sad}, your input isn't valid. click /help for more info.`
                  );
                  API.sendMessage(
                    ADMIN,
                    `InvalidInputError[/findbyword] =>\nUsername: ${user}\nUserId: ${userId}\nInput: Invalid input`
                  );
                }
              });
            }
          }
        ]
      });
    } else if (clickedCommand) {
      this.findWordLogic($, clickedCommand, user, userId);
    } else {
      $.sendMessage(
        `Sorry ${user} ${emojis.sad}, your input isn't valid. click /help for more info.`
      );
      API.sendMessage(
        ADMIN,
        `InvalidInputError[/findbyword] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${clickedCommand}`
      );
    }
  }

  /**
   * @param {Scope} $
   */
  alphSearchHandler($, text) {
    const user = $.message.from.firstName || $.message.from.lastName;
    const userId = $.message.chat.id;
    const msg = text ? text : $.message.text;

    if (msg == "🔎 Find By Alphabet 🔤") {
      const scope = $;
      const menuArgs = [scope, user, userId];
      const menu = this.findByAlphMenu(menuArgs);

      $.runInlineMenu({
        layout: 4,
        method: "sendMessage",
        params: ["Please select an alphabet below:"],
        menu: menu
      });
    } else {
      $.sendMessage(
        `Sorry ${user} ${emojis.sad}, your input isn't valid. click /help for more info.`
      );
      API.sendMessage(
        ADMIN,
        `InvalidInputError[/findbyalpahbet] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`
      );
    }
  }

  /**
   * @param {Scope} $
   */
  helpHandler($) {
    // $.sendMessage(`${emojis.fingerRight}To find the interpretation to a word click *🔎 Search*\n\n${emojis.fingerRight}Click 🔎*Search By Alphabet*🔤  to see words related to any alphabet\n\n${emojis.fingerRight}Check your spellings by clicking 📝 *Spell Checker* \n\n${emojis.fingerRight} Find synonyms\n\nStill not clear enough? Ask my [creator](https://t.me/Lover_Of_Jesus)`, { parse_mode: "Markdown"})
    $.sendMessage(
      `To use my current version you need to have bought the book.\nhttps://www.amazon.com/Dictionary-Dreams-Tella-Olayeri/dp/B0053B58RQ\nIn my current version here is what I can do:\n\n1. You can check if a word is in the dictionary and find its page. To do this use /findbyword command and then the word \ne.g /findbyword football. \n\n2. Show you all the words in a particular alphabet. To do this use /findbyalphabet command followed by the alphabet \ne.g /findbyalphabet p \n\n*NOTE:*Click the backslash (right side of your text input area), and pressdown the command you want before you type a word (don't click on the command, if you do it will send immediately).\n\n  In the coming version you can be able to find the interpretaions directly from the bot without the dream dictionary.\n\nHave any question? Ask my [creator](https://t.me/Lover_Of_Jesus)`,
      { parse_mode: "Markdown" }
    );
    let user = $.message.from.firstName || $.message.from.lastName;
    let userId = $.message.chat.id;
    API.sendMessage(
      ADMIN,
      `Someone needs help.\nUsername: ${user}\nUserId: ${userId}`
    );
  }

  testHandler($) {
    const msg = $.message.text;
    console.log(msg);
    const form = {
      name: {
        q: "Send me your name",
        error: "sorry, wrong input",
        validator: (message, callback) => {
          if (message.text) {
            console.log(message.text);
            callback(true, message.text); //you must pass the result also
            return;
          }

          callback(false);
        }
      },
      age: {
        q: "Send me your age",
        error: "sorry, wrong input",
        keyboard: [[{ text: "btn 1" }], [{ text: "btn 2" }]],
        validator: (message, callback) => {
          // console.log(message)
          if (message.text && Number(message.text)) {
            let answer = callback(true, Number(message.text));
            console.log(answer);
            return;
          }

          callback(false);
        }
      }
    };

    $.runMenu({
      message: "Select:",
      options: {
        parse_mode: "Markdown" // in options field you can pass some additional data, like parse_mode
      },
      Exit: {
        message: "Do you realy want to exit?",
        resizeKeyboard: true,
        yes: () => {
          // remove keyboard when you send message
          $.sendMessage("Alright", {
            reply_markup: JSON.stringify({ remove_keyboard: true })
          });
        },
        no: () => {
          $.sendMessage("Exiting", {
            reply_markup: JSON.stringify({ remove_keyboard: true })
          });
        }
      }
    });

    $.sendMessage("What do you think?", {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: "Very great",
              callback_data: "vg"
            },
            {
              text: "No really great",
              callback_data: "vgnrg"
            }
          ],
          [
            {
              text: "Poor",
              callback_data: "p"
            },
            {
              text: "Very poor",
              callback_data: "vp"
            }
          ]
        ]
      })
    });

    $.waitForCallbackQuery(["p", "vg", "vp", "vgnrg"], d => {
      console.log(d);
    });
  }

  /**
   * @param {Scope} $
   */
  feedbackHandler($) {
    let user = $.message.from.firstName || $.message.from.lastName;
    let userId = $.message.chat.id;
    $.sendMessage(
      `Tell me how you want me to serve you better. ${emojis.smile}`,
      { parse_mode: "Markdown" }
    );
    $.waitForRequest.then($ => {
      let val = $.message.text;
      if (val) {
        API.sendMessage(ADMIN, `Feedback from ${user}\n\n ${val}`);
        $.sendMessage(`Thanks for your feedback, it is really appreciated`);
        $.sendSticker(stickers.thanksStickerLionKing);
      } else {
        $.sendMessage(
          `Sorry ${user} ${emojis.sad}, your input isn't valid. click /help for more info.`
        );
        API.sendMessage(
          ADMIN,
          `InvalidInputError[feedbackHandler] =>\nUsername: ${user}\nUserId: ${userId}\nInput: Invalid input`
        );
      }
    });
  }

  /**
   * @param {Scope} $
   */
  startHandler($) {
    let scope = $;
    $.runMenu({
      message:
        "Welcome, my goal is to help you interprete keywords in your dream.\n\nPick from the MENU below to get started:",
      // oneTimeKeyboard : true,
      layout: 2,
      "💾 Save": () => {
        this.saveHandler(scope);
      },
      "🔎 Search": () => {
        let text = "🔎 Search";
        this.wordSearchHandler(scope, text);
      },
      "🔎 Find By Alphabet 🔤": () => {
        let text = "🔎 Find By Alphabet 🔤";
        this.alphSearchHandler(scope, text);
      },
      "📝 Spell Checker": () => {
        let text = "📝 Spell Checker";
        dictionary.spellCheckerHandler(scope, text);
      },
      "📚 Synonym": () => {
        let text = "📚 Synonym";
        dictionary.synonymHandler(scope, text);
      },
      "🗣👂 Feedback": () => {
        this.feedbackHandler(scope);
      }
    });
    //$.sendMessage(`To get started *click the backslash* on the _top right of your keyboard_ ( it looks like this / ).\nThere you would see the list of commands available for you to use.\nClick on /help to see examples of how to use those commands.`, { parse_mode: "Markdown"})
    let user = $.message.from.firstName
      ? $.message.from.firstName
      : $.message.from.lastName;
    let userId = $.message.chat.id;
    API.sendMessage(
      ADMIN,
      `You have a new user.\n\nUsername: ${user}\nUserId: ${userId}`
    );
  }

  _serializeList(user, words, pages) {
    const messages = [];
    let nextBatch = true;
    const exclusions = [0, 1, 2, 18];
    let serialized = `*Here You Go ${user} ${emojis.smile}*\n`;

    words.forEach((word, index) => {
      if (exclusions.includes(index) && nextBatch) {
        messages.push(serialized);
        serialized = "";
        nextBatch = false;
      }

      serialized += `/${word.charAt(0).toUpperCase() + word.slice(1)} (pg. ${
        pages[index]
        }) \n`;
    });

    messages.push(serialized);

    return messages;
  }

  findWordLogic($, msg, user, userId) {
    let found = false;
    let words;
    let matched;
    let page;
    let input;
    let meaning = "";
    let synonymOfWord = "";
    let suggestions = [];
    let numErr = false;

    // This means the user is searching for a word
    if (isNaN(msg)) {
      input = msg
        .trim()
        .replace(/ /g, "")
        .toLowerCase();
      const firstLetter = input.match(/\w/);

      if (firstLetter) {
        lib.arr.filter(el => {
          let alphabet = el.container.alph;

          if (alphabet == firstLetter) {
            words = el.container.words;

            words.forEach((word, index) => {
              const foundAll = [];
              const reg = new RegExp("\\b" + input + "\\b", "gi");
              const matchWord = word.match(reg);

              synonymOfWord = `Find synonyms of ${input}`;

              if (matchWord) {
                found = true;
                matched = matchWord["0"];
                page = el.container.pages[index];
                meaning = generateMeaning(word);
              }

              for (let i in input) {
                const iLetter = input[i];
                const wLetter = word[i];

                if (iLetter === wLetter) {
                  foundAll.push(1);
                } else {
                  foundAll.push(0);
                }
              }

              if (!foundAll.includes(0)) {
                suggestions.push(`/${word}`);
              }
            });
          }
        });
      } else {
        $.sendMessage(
          `Sorry ${user} ${emojis.sad}, your input isn't valid. Make sure you entered an english word`
        );
        API.sendMessage(
          ADMIN,
          `NotEnglishError =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`
        );

        return;
      }
    } // This means the user is searching for a page
    else {
      if (msg >= 19 && msg <= 826) {
        found = true;
        page = msg;
        matched = `Page ${page}`;
      } else {
        numErr = true;

        $.sendMessage(
          `Sorry ${user} ${emojis.sad}, such page isn't in the dictionary`
        );

        API.sendMessage(
          ADMIN,
          `NotEnglishError =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`
        );

        return;
      }
    }

    if (found) {
      if (meaning) {
        $.sendMessage(meaning, { parse_mode: "Markdown" });
      } else {
        if (Array.isArray(page)) {
          page.forEach(pageElement => {
            this.sendImage($, msg, user, userId, pageElement);
          });
        } else {
          this.sendImage($, msg, user, userId, page, matched);
        }
      }

      API.sendMessage(ADMIN, `User ${user} searched for ${matched}`);
    } else if (!found && !numErr) {
      API.sendMessage(
        ADMIN,
        `404\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`
      );

      let searchAgainText = "Try Again";
      let suggest = "";
      let wordSuggestedByBot = "";

      if (suggestions.length) {
        suggest = `\n\nDid you mean ${
          suggestions.length === 1 ? "" : "any of these: "
          }${suggestions.join(", ")}?\n\nJust click on any of the above and I will find the meaning ${emojis.oneEye}`;

        wordSuggestedByBot = suggestions[0];
        searchAgainText = `Search for ${wordSuggestedByBot}`;
      }

      const question = `Sorry ${user} ${emojis.sad}, ${input} wasn't found.${suggest}`;

      const searchAgainParams = {
        $,
        question,
        search: { text: searchAgainText, word: wordSuggestedByBot },
        synonym: { text: synonymOfWord, word: input }
      };

      this.searchAgain(searchAgainParams);
    }
  }

  searchAgain(params) {
    const { $, question, search, synonym } = params;

    $.runInlineMenu({
      layout: 1,
      method: "sendMessage",
      params: [question],
      menu: [
        {
          text: search.text,
          callback: query => {
            const { id } = query;

            API.answerCallbackQuery(id, {
              text: "Lets go"
            });

            this.wordSearchHandler($, "🔎 Search", search.word);
          }
        },
        {
          text: synonym.text,
          callback: query => {
            const { id } = query;

            API.answerCallbackQuery(id, {
              text: "Lets go"
            });

            dictionary.synonymHandler($, synonym.word);
          }
        },
        //         {
        //           text: "Alphabet Search",
        //           callback: query => {
        //             const { id } = query;

        //             API.answerCallbackQuery(id, {
        //               text: "Got it."
        //             });

        //             this.alphSearchHandler($, "🔎 Find By Alphabet 🔤");
        //           }
        //         }
      ]
    });
  }

  // Send images for a particular page in the dream dictionary
  sendImage($, msg, user, userId, page, matched) {
    const imagesFile = fs.readFileSync("images/images.json", "utf8");
    const jsonImages = JSON.parse(imagesFile);
    const image = jsonImages.images[page];

    if (image) {
      const send = $.sendPhoto(image);
      send.catch(error => {
        $.sendMessage(
          `Unfortunately ${user} ${emojis.sad}, no image for ${matched
            .charAt(0)
            .toUpperCase() +
          matched.slice(1)} in page ${page} yet. It would be available soon${
          emojis.coolGlasses
          }`
        );
        API.sendMessage(
          ADMIN,
          `ImageSendError[/findbyword] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}\nPage: ${page}`
        );
        API.sendMessage(ADMIN, `Description => ${error.description}`);
      });
    } else {
      $.sendMessage(
        `Unfortunately ${user} ${emojis.sad}, no image for ${matched
          .charAt(0)
          .toUpperCase() +
        matched.slice(1)} in page ${page} yet. It would be available soon${
        emojis.coolGlasses
        }`
      );
      API.sendMessage(
        ADMIN,
        `ImageSendError[/findbyword] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}\nPage: ${page}\nDescription => Cannot read property 'url' of undefined`
      );
    }
  }

  findAlphabetLogic($, msg, user, userId, editMsgId, chat_id) {
    let input = msg.toLowerCase();
    let checker = false;
    lib.arr.forEach(el => {
      let alphabet = el.container.alph;
      if (alphabet == input) {
        let words = el.container.words;
        let pages = el.container.pages;
        checker = true;

        const [msg1, msg2 = ""] = this._serializeList(user, words, pages);

        API.editMessageText(msg1, {
          parse_mode: "Markdown",
          chat_id,
          message_id: editMsgId
        });

        if (msg2.length) {
          setTimeout(() => {
            $.sendMessage(msg2, { parse_mode: "Markdown" });
          }, 200);
        }

        API.sendMessage(ADMIN, `User ${user} used the alphabetSearchHandler`);
      }
    });
    if (!checker) {
      $.sendMessage(
        `Sorry ${user} ${emojis.sad}, Such alphabet doesn't exist, check your spelling`
      );
      API.sendMessage(
        ADMIN,
        `NotFoundError[/findbyalpahbet] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`
      );
    }
  }

  findByAlphMenu(menuArgs) {
    const [scope, user, userId] = menuArgs;
    const menu = [];

    for (const alphabet of ALPHABETS.UPPERCASE) {
      const option = {
        text: alphabet,
        callback: query => {
          const {
            id,
            message: { messageId, chat }
          } = query;

          API.answerCallbackQuery(id, {
            text: "Here you go :)"
          });

          this.findAlphabetLogic(
            scope,
            alphabet,
            user,
            userId,
            messageId,
            chat.id
          );
        }
      };

      menu.push(option);
    }

    return menu;
  }

  // Get the full sentence
  // split by spaace
  // sort alphabetically
  // group into alphabets (a => [ab, ac, ad]) etc....

  get routes() {
    return {
      saveCommand: "saveHandler",
      wordSearchCommand: "wordSearchHandler",
      alphSearchCommand: "alphSearchHandler",
      helpCommand: "helpHandler",
      startCommand: "startHandler",
      testCommand: "testHandler",
      feedbackCommand: "feedbackHandler"
    };
  }
}

module.exports = BrainController;
