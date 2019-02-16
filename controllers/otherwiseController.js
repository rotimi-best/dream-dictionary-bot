"use strict";

const Telegram = require("telegram-node-bot");
const BaseController = Telegram.TelegramBaseController;
const { api: API } = require("../index.js");
const BrainController = require("./brainController");
const brainController = new BrainController();

let coolGlasses = "😎";
let oneEye = "😉";
let fingerRight = "👉";
let smile = "🙂";
let fingerDown = "👇";

class OtherwiseController extends BaseController {
  /**
   * @param {Scope} $
   */
  handle($) {
    const { ADMIN } = process.env;

    const firstName = $.message.chat.firstName || $.message.chat.lastName;
    const msg = $.message.text ? $.message.text : "Not a text";
    const userId = $.message.chat.id;
    const testIfEng = RegExp("[a-z A-Z]");

    if (testIfEng.test(msg)) {
      brainController.wordSearchHandler($, "🔎 Search", msg);

      API.sendMessage(
        ADMIN,
        `${firstName} Search from otherwise controller for ${msg}`
      );
    } else {
      $.sendMessage(
        `To search for a word, e.g Bag\n\n1. Open *MENU* (_The ICON on the top-right of your keyboard_)\n2. Click 🔎 Search\n3. Enter the *WORD* you are looking for: Bag\n\n_You can check your spelling, find synonyms and many more, just open the menu_${fingerDown} _and explore_\n*ENJOY* ${oneEye}`,
        { parse_mode: "Markdown" }
      );
      API.sendMessage(ADMIN, `404 from ${firstName} || ${userId}\n\n${msg}`);
    }
  }
}
module.exports = OtherwiseController;
