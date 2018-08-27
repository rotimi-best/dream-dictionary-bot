'use strict'

const Telegram = require('telegram-node-bot');
const BaseController = Telegram.TelegramBaseController
const telegramBot = require('../index.js')

let coolGlasses = '😎'
let oneEye = '😉';
let fingerRight = '👉';
let smile = '🙂';
let fingerDown = '👇';

class OtherwiseController extends BaseController {
    /**
     * @param {Scope} $
     */
    handle($) {
        const myChatId = '380473669';
        let firstName = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let msg = $.message.text ? $.message.text : 'Not a text';
        let userId = $.message.chat.id;
        $.sendMessage(`To search for a word, e.g Bag\n\n1. Open *MENU* (_The ICON on the top-right of your keyboard_)\n2. Click 🔎 Search\n3. Enter the *WORD* you are looking for: Bag\n\n_You can check your spelling, find synonyms and many more, just open the menu_${fingerDown} _and explore_\n*ENJOY* ${oneEye}`, { parse_mode: "Markdown" })
        telegramBot.api.sendMessage(myChatId, `GeneralError =>\nUsername: ${firstName}\nUserId: ${userId}\nInput: ${msg}`)
        /* switch(msg) {
            case '💾 Save' :
               $.sendMessage(`You can send me the content of your dream and I will save it ${oneEye}.\n\nPlease click this ${fingerRight} /save to continue`);
                break;
            case '🔎 Search' :
                $.sendMessage(`You can send me a key word from your dream and I will tell you its meaning ${oneEye}.\n\nPlease click this ${fingerRight} /findbyword to continue`);
                break;
            case '🔎 Search By Alphabet 🔤':
                $.sendMessage(`I can tell you all available keywords that begins with an alphabet of your choice\n\nPlease click this ${fingerRight} /findbyalphabet to continue`);
                break;
            case '📝 Spell Checker':
                $.sendMessage(`If you are not sure of your spelling, I can correct it${coolGlasses}\n\nPlease click this ${fingerRight} /spellchecker to continue`);    
                break;
            case '📚 Synonym':
                $.sendMessage(`I can help you find synonyms to any word ${oneEye}.\n\nPlease click this ${fingerRight} /synonym to continue`);    
                break;
            case '🔑 Help':
                $.sendMessage(`You need more explanation?\n\nPlease click this ${fingerRight} /help to continue`);
                break;
            default:
                //$.sendMessage(`To search for a word, e.g Bag\n\nJust type this:\n/findbyword Bag\n\nClick /help to see all I can do ${coolGlasses}`)
                
        } */
    }
}
module.exports = OtherwiseController