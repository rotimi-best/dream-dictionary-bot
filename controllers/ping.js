'use strict'

const Telegram = require('telegram-node-bot');

class BrainController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    pingHandler($) {
        $.sendMessage('Welcome! I am here to help you.')
    }

    get routes() {
        return {
            'pingCommand':'pingHandler'
        }
    }
}

module.exports = BrainController