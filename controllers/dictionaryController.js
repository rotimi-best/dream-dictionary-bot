'use strict'

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController

const lib = require('../text/libArray');
const fs = require('fs');
const nodehun = require('nodehun');
const path = require('path')
const usBase = require.resolve('dictionary-en-us')

let dictbuf = fs.readFileSync(path.join(usBase, 'index.dic'), 'utf-8')
let affbuf = fs.readFileSync(path.join(usBase, 'index.aff'), 'utf-8')

let dict = new nodehun(affbuf,dictbuf);

class DictionaryController extends TelegramBaseController
{
    /**
     * @param {Scope} $
     */
    spellCheckerHandler($) {
        let user = $.message.chat.firstName
        let val = $.message.text.split(' ').slice(1).join(' ')

        $.sendMessage(`For now this functionality is still in production, in few days it should be ready. Thank you`, { parse_mode: "Markdown"})
    }

    get routes() {
        return {
            'spellCheckerCommand' : 'spellCheckerHandler',
        }
    }
}

module.exports = DictionaryController