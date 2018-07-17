'use strict'

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController

const lib = require('../text/libArray')
const fs = require('fs')

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