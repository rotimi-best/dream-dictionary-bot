'use strict'

const Telegram = require('telegram-node-bot');
const BaseController = Telegram.TelegramBaseController

class OtherwiseController extends BaseController {
    /**
     * @param {Scope} $
     */
    handle($) {
        $.sendMessage('Sorry, I don\'t understand')
    }

}

module.exports = OtherwiseController