'use strict'

const Telegram = require('telegram-node-bot');
const BaseController = Telegram.TelegramBaseController
const telegramBot = require('../index.js')

class OtherwiseController extends BaseController {
    /**
     * @param {Scope} $
     */
    handle($) {
        const myChatId = '380473669';
        let firstName = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let msg = $.message.text ? $.message.text : 'Not a text';
        let userId = $.message.chat.id;
        $.sendMessage('Sorry, I don\'t understand, check out my full capacity /help ))')
        telegramBot.api.sendMessage(myChatId, `Error =>\nUsername: ${firstName}\nUserId: ${userId}\nInput: ${msg}`)
    }
}

module.exports = OtherwiseController