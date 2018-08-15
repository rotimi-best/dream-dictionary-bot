'use strict'

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController

const dictionary = require('dictionary-en-us')
const nspell = require('nspell');
const telegramBot = require('../index.js');
const myChatId = '380473669';

class DictionaryController extends TelegramBaseController
{
    /**
     * @param {Scope} $
     */
    spellCheckerHandler($) {
        let user = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let userId = $.message.chat.id;
        let msg = $.message.text;
        let word = msg.split(' ').slice(1).join(' ')

        if(word.length > 1 && word.match(/[a-z]/i)){
            //Logic to suggest
            let spellChecker = (err, dict) => {
                if(err) {
                    throw err
                }
                const spellObj = nspell(dict)
                let correct = spellObj.correct(word);

                if(correct){
                    //Your value is correct
                    $.sendMessage(`Hey ${user}, your spelling is correct, go ahead and find the meaning by just typing:/findbyword ${word}`, {parse_mode: 'Markdown'})
                    telegramBot.api.sendMessage(myChatId, `User ${user} is using the spellCheckerHandler, but no suggestion for word: ${word}`);
                } else {
                    let suggestions = spellObj.suggest(word)
                    if(suggestions === Array){
                        $.sendMessage(this._serializeList(user, word, suggestions), {parse_mode: 'Markdown'})
                    } else{
                        $.sendMessage(`Hey ${user}, the word ${word} is incorrect. I got a suggestion for you:\n${suggestions[0]}.\nTo find the meaning just type: /findbyword ${suggestions[0]}`, {parse_mode: 'Markdown'})
                    }
                }
            }
            dictionary(spellChecker)
        } else{
            //Sorry your word is invalid
            $.sendMessage(`Sorry your input is invalid, make sure you typed in english and its not a number.`, { parse_mode: "Markdown"})
            telegramBot.api.sendMessage(myChatId, `Error =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`)
        }
        // $.sendMessage(`For now this functionality is still in production, in few days it should be ready. Thank you`, { parse_mode: "Markdown"})
    }

    get routes() {
        return {
            'spellCheckerCommand' : 'spellCheckerHandler',
        }
    }

    _serializeList(user, word, suggestions) {
        let serialized = `*Hey ${user}, the word ${word} is incorrect. I got some suggestions for you:*\n\n`;
        suggestions.forEach((suggestion) => {
            serialized +=  `${suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}\n`
        })
        serialized +=  `\nTo find the meaning of any of the word just type: /findbyword ${suggestions[0].charAt(0).toUpperCase()}`
        return serialized;
    }
}

module.exports = DictionaryController