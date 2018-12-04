'use strict'

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController

const lib = require('../text/libArray')
const fs = require('fs')
const telegramBot = require('../index.js')
const myChatId = '380473669';

const DictionaryController = require('./dictionaryController')
let dictionary = new DictionaryController;

const emojis = {
    'success' : '🕺',
    'smile' : '🙂',
    'sad' : '😞',
    'coolGlasses' : '😎',
    'oneEye' : '😉',
    'spellChecker' : '📝',
    'help' : '🔑',
    'byAlphabet' : '🔤',
    'search' : '🔎',
    'synonym' : '📚',
    'chat' : '🗣👂',
    'fingerRight' : '👉',
    'save' : '💾',
    'fingerDown' : '👇',
    'byNumber' : '🔢'
};

const stickers = {
    'waitingSticker' : 'CAADAgADPQgAAnlc4gkSO7rndkwKigI',
    'thanksStickerLionKing' : 'CAADAgADqQIAAs-71A5iOMlYXuwndQI',
}

class BrainController extends TelegramBaseController{

    /**
     * @param {Scope} $
     */
    saveHandler($){
        $.sendMessage(`The save functionality is not ready yet. It should be anytime soon ${emojis.smile}`);
        let user = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let userId = $.message.chat.id;
        telegramBot.api.sendMessage(myChatId, `Someone tried to save his dream\n\nUsername: ${user}\nUserId: ${userId}`)
    }

    /**
     * @param {Scope} $
     */
    wordSearchHandler($, text) {
        // $.sendMessage('I am here to help you.')
        let user = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let userId = $.message.chat.id;
        let msg = text ? text : $.message.text;
        if(msg == '🔎 Search'){
            let scope = $;
            $.runInlineMenu({
                layout: 2,
                method: 'sendMessage',
                params: ['Do you want to search for a Word or a Page?'],
                menu: [
                    { text:'Word', callback: () => {
                        scope.sendMessage(`*Which *WORD* are you looking for?*\n\nSend me, I am waiting...${emojis.smile}`, {parse_mode: 'Markdown'});
                        scope.waitForRequest
                             .then($ => {
                                let val = $.message.text; 
                                 if(val){
                                     this.findWordLogic($, val, user, userId)
                                 } else {
                                     $.sendMessage(`Sorry ${user} ${emojis.sad}, your input isn't valid. click /help for more info.`)
                                     telegramBot.api.sendMessage(myChatId, `InvalidInputError[/findbyword] =>\nUsername: ${user}\nUserId: ${userId}\nInput: Invalid input`)
                                 }
                             })  
                     } 
                 },
                 { text:'Page', callback: () => {
                    scope.sendMessage(`*Which *PAGE* are you looking for?*\n\nSend me, I am waiting...${emojis.smile}`, {parse_mode: 'Markdown'});
                    scope.waitForRequest
                         .then($ => {
                            let val = $.message.text; 
                             if(val){
                                 this.findWordLogic($, val, user, userId)
                             } else {
                                 $.sendMessage(`Sorry ${user} ${emojis.sad}, your input isn't valid. click /help for more info.`)
                                 telegramBot.api.sendMessage(myChatId, `InvalidInputError[/findbyword] =>\nUsername: ${user}\nUserId: ${userId}\nInput: Invalid input`)
                             }
                         })   
                    } 
                 },  
                ]
            });
           
        } else{
            $.sendMessage(`Sorry ${user} ${emojis.sad}, your input isn't valid. click /help for more info.`)
            telegramBot.api.sendMessage(myChatId, `InvalidInputError[/findbyword] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`)
        }
    }

    /**
     * @param {Scope} $
     */
    alphSearchHandler($, text) {
        let user = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let userId = $.message.chat.id;
        let msg = text ? text : $.message.text;
        // let val = msg.split(' ').slice(1).join(' ')
        if(msg == '🔎 Find By Alphabet 🔤') {
            let scope = $;
            $.runInlineMenu({
                layout: 4,
                method: 'sendMessage',
                params: ['Please select an alphabet below:'],
                menu: [
                    { text:'A', callback: () => {this.findAlphabetLogic(scope, 'A', user, userId)} },
                    { text:'B', callback: () => {this.findAlphabetLogic(scope, 'B', user, userId)} },  
                    { text:'C', callback: () => {this.findAlphabetLogic(scope, 'C', user, userId)} }, 
                    { text:'D', callback: () => {this.findAlphabetLogic(scope, 'D', user, userId)} }, 
                    { text:'E', callback: () => {this.findAlphabetLogic(scope, 'E', user, userId)} }, 
                    { text:'F', callback: () => {this.findAlphabetLogic(scope, 'F', user, userId)} }, 
                    { text:'G', callback: () => {this.findAlphabetLogic(scope, 'G', user, userId)} }, 
                    { text:'H', callback: () => {this.findAlphabetLogic(scope, 'H', user, userId)} }, 
                    { text:'I', callback: () => {this.findAlphabetLogic(scope, 'I', user, userId)} }, 
                    { text:'J', callback: () => {this.findAlphabetLogic(scope, 'J', user, userId)} }, 
                    { text:'K', callback: () => {this.findAlphabetLogic(scope, 'K', user, userId)} }, 
                    { text:'L', callback: () => {this.findAlphabetLogic(scope, 'L', user, userId)} }, 
                    { text:'M', callback: () => {this.findAlphabetLogic(scope, 'M', user, userId)} }, 
                    { text:'N', callback: () => {this.findAlphabetLogic(scope, 'N', user, userId)} }, 
                    { text:'O', callback: () => {this.findAlphabetLogic(scope, 'O', user, userId)} }, 
                    { text:'P', callback: () => {this.findAlphabetLogic(scope, 'P', user, userId)} }, 
                    { text:'Q', callback: () => {this.findAlphabetLogic(scope, 'Q', user, userId)} }, 
                    { text:'R', callback: () => {this.findAlphabetLogic(scope, 'R', user, userId)} }, 
                    { text:'S', callback: () => {this.findAlphabetLogic(scope, 'S', user, userId)} }, 
                    { text:'T', callback: () => {this.findAlphabetLogic(scope, 'T', user, userId)} },                          
                    { text:'U', callback: () => {this.findAlphabetLogic(scope, 'U', user, userId)} }, 
                    { text:'V', callback: () => {this.findAlphabetLogic(scope, 'V', user, userId)} }, 
                    { text:'W', callback: () => {this.findAlphabetLogic(scope, 'W', user, userId)} }, 
                    { text:'X', callback: () => {this.findAlphabetLogic(scope, 'X', user, userId)} }, 
                    { text:'Y', callback: () => {this.findAlphabetLogic(scope, 'Y', user, userId)} }, 
                    { text:'Z', callback: () => {this.findAlphabetLogic(scope, 'Z', user, userId)} }, 
                ]
            });
        } else {
            $.sendMessage(`Sorry ${user} ${emojis.sad}, your input isn't valid. click /help for more info.`)
            telegramBot.api.sendMessage(myChatId, `InvalidInputError[/findbyalpahbet] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`)
        }
    }

    /**
     * @param {Scope} $
     */
    helpHandler($) {
        // $.sendMessage(`${emojis.fingerRight}To find the interpretation to a word click *🔎 Search*\n\n${emojis.fingerRight}Click 🔎*Search By Alphabet*🔤  to see words related to any alphabet\n\n${emojis.fingerRight}Check your spellings by clicking 📝 *Spell Checker* \n\n${emojis.fingerRight} Find synonyms\n\nStill not clear enough? Ask my [creator](https://t.me/Lover_Of_Jesus)`, { parse_mode: "Markdown"})
        $.sendMessage(`To use my current version you need to have bought the book.\nhttps://www.amazon.com/Dictionary-Dreams-Tella-Olayeri/dp/B0053B58RQ\nIn my current version here is what I can do:\n\n1. You can check if a word is in the dictionary and find its page. To do this use /findbyword command and then the word \ne.g /findbyword football. \n\n2. Show you all the words in a particular alphabet. To do this use /findbyalphabet command followed by the alphabet \ne.g /findbyalphabet p \n\n*NOTE:*Click the backslash (right side of your text input area), and pressdown the command you want before you type a word (don't click on the command, if you do it will send immediately).\n\n  In the coming version you can be able to find the interpretaions directly from the bot without the dream dictionary.\n\nHave any question? Ask my [creator](https://t.me/Lover_Of_Jesus)`, { parse_mode: "Markdown"})
        let user = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let userId = $.message.chat.id;
        telegramBot.api.sendMessage(myChatId, `Someone needs help.\nUsername: ${user}\nUserId: ${userId}`)
    }
  
    testHandler($) {
      const msg = $.message.text;
      console.log(msg);
      const form = {
    name: {
	    q: 'Send me your name',
	    error: 'sorry, wrong input',
	    validator: (message, callback) => {
		    if(message.text) {
          console.log(message.text); 
			    callback(true, message.text) //you must pass the result also
			    return
		    }

		    callback(false)
	    }
    },
    age: {
	    q: 'Send me your age',
	    error: 'sorry, wrong input',
      keyboard: [
        [{text: 'btn 1'}], [{text: 'btn 2'}]
      ],
	    validator: (message, callback) => {
        // console.log(message)
		    if (message.text && Number(message.text)) {
			    let answer = callback(true, Number(message.text))
          console.log(answer)
			    return
		    }

		    callback(false)
	    }
    }
}

$.runForm(form, (result) => {
  $.sendMessage(`Thanks you for your answer ${JSON.stringify(result)}`, 
                {
                  reply_markup: JSON.stringify({ remove_keyboard: true }),
                });
	console.log(form)
})
      //   $.sendMessage({
      //     text: 'Some sddfs...',
      //     reply_markup: JSON.stringify({
      //         'one_time_keyboard' : true
      //     })
      // });
    }
      

    /**
     * @param {Scope} $
     */
    feedbackHandler($) {
        let user = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let userId = $.message.chat.id;
        $.sendMessage(`Tell me how you want me to serve you better. ${emojis.smile}`, { parse_mode: "Markdown"});
        $.waitForRequest
            .then($ => {
                let val = $.message.text; 
                if(val){
                    telegramBot.api.sendMessage(myChatId, `Feedback from ${user}\n\n ${val}`)
                    $.sendMessage(`Thanks for your feedback, it is really appreciated`)
                    $.sendSticker(stickers.thanksStickerLionKing);
                } else {
                    $.sendMessage(`Sorry ${user} ${emojis.sad}, your input isn't valid. click /help for more info.`)
                    telegramBot.api.sendMessage(myChatId, `InvalidInputError[feedbackHandler] =>\nUsername: ${user}\nUserId: ${userId}\nInput: Invalid input`)
                }
            })
    }

    /**
     * @param {Scope} $
     */
    startHandler($) {
        let scope = $;
        $.runMenu({
            message: 'Welcome, my goal is to help you interprete keywords in your dream.\n\nPick from the MENU below to get started:',  
            oneTimeKeyboard : true,
            layout: 2,
            '💾 Save' : () => {this.saveHandler(scope)},
            '🔎 Search' : () => {
                let text = '🔎 Search';
                this.wordSearchHandler(scope, text)
            },
            '🔎 Find By Alphabet 🔤' : () => {
                let text = '🔎 Find By Alphabet 🔤'
                this.alphSearchHandler(scope, text)
            },
            '📝 Spell Checker' : () => {
                let text = '📝 Spell Checker'
                dictionary.spellCheckerHandler(scope, text)
            },
            '📚 Synonym' : () => {
                let text = '📚 Synonym'
                dictionary.synonymHandler(scope, text)
            }, 
            '🗣👂 Feedback' : () => {this.feedbackHandler(scope)}, 
        })
        //$.sendMessage(`To get started *click the backslash* on the _top right of your keyboard_ ( it looks like this / ).\nThere you would see the list of commands available for you to use.\nClick on /help to see examples of how to use those commands.`, { parse_mode: "Markdown"})
        let user = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let userId = $.message.chat.id;
        telegramBot.api.sendMessage(myChatId, `You have a new user.\n\nUsername: ${user}\nUserId: ${userId}`)
    }

    _serializeList(user, words, pages) {
        let serialized = `*Here You Go ${user} ${emojis.smile}*\n`;
        words.forEach((word, index) => {
            serialized +=  `${word.charAt(0).toUpperCase() + word.slice(1)} (pg. ${pages[index]}) \n`
        })
        return serialized;
    }

    findWordLogic($, msg, user, userId) {
        let found = false
        let matched, page, input
        let numErr = false
        if(isNaN(msg)){
            //console.log('not a number', msg);
            input = msg.trim().replace(/ /g, '');
            let firstLetter = input.match(/\w/);
            if(firstLetter){
                lib.arr.forEach((element) => {
                    let alphabet = element.container.alph
                    if(alphabet == firstLetter['0'].toLowerCase()){
                        let words = element.container.words
                        words.forEach((el, index) => {
                            let reg = new RegExp('\\b' + input + '\\b', 'gi')
                            let matchWord = el.match(reg)
                            if(matchWord){
                                found = true
                                matched = matchWord['0']
                                page = element.container.pages[index]
                            }
                        })
                    }	
                });
            } else {
                $.sendMessage(`Sorry ${user} ${emojis.sad}, your input isn't valid. Make sure you entered an english word`)
                telegramBot.api.sendMessage(myChatId, `NotEnglishError =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`)
            }
        } else {
            if(msg >= 19 && msg <= 826){
                found = true
                page = msg
                matched = `Page ${page}`
            } else{
                numErr = true
                $.sendMessage(`Sorry ${user} ${emojis.sad}, such page isn't in the dictionary`)
                telegramBot.api.sendMessage(myChatId, `NotEnglishError =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`)
            }
        } 

        if(found){
            $.sendMessage(`Hurray ${emojis.success}, there is an interpretation for ${matched.charAt(0).toUpperCase() + matched.slice(1)}. \n\nHere you go..`)
            //$.sendMessage(`Hurray ${emojis.success}, the word ${matched.charAt(0).toUpperCase() + matched.slice(1)} was found in page ${page}`)
            telegramBot.api.sendMessage(myChatId, `User ${user} used the wordSearchHandler and searched for ${matched}`) 
            if(Array.isArray(page)){
                page.forEach((pageElement) => {
                    this.sendImage($, msg, user, userId, pageElement)
                })
            } else{
                this.sendImage($, msg, user, userId, page, matched);
            }	
        } else if(!found && !numErr) {
            telegramBot.api.sendMessage(myChatId, `NotFoundError[/findbyword] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`)
            $.sendMessage(`Sorry ${user} ${emojis.sad}, ${input} wasn't found.\n\nTry adding/removing (s) at the end of the word or check your spelling by using the SpellChecker in the menu.`)
        }  
    }

    // Send images for a particular page in the dream dictionary
    sendImage($, msg, user, userId, page, matched){
        let imagesFile = fs.readFileSync('variables/images.json', 'utf8');
        let jsonImages = JSON.parse(imagesFile);
        let image = jsonImages.images[page];
        if(image){
        const send = $.sendPhoto(image);
        send.catch((error) => {
            $.sendMessage(`Unfortunately ${user} ${emojis.sad}, no image for ${matched.charAt(0).toUpperCase() + matched.slice(1)} in page ${page} yet. It would be available soon${emojis.coolGlasses}`);
            telegramBot.api.sendMessage(myChatId, `ImageSendError[/findbyword] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}\nPage: ${page}`)
            telegramBot.api.sendMessage(myChatId, `Description => ${error.description}`)
        });
        } else {
            $.sendMessage(`Unfortunately ${user} ${emojis.sad}, no image for ${matched.charAt(0).toUpperCase() + matched.slice(1)} in page ${page} yet. It would be available soon${emojis.coolGlasses}`);
            telegramBot.api.sendMessage(myChatId, `ImageSendError[/findbyword] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}\nPage: ${page}\nDescription => Cannot read property 'url' of undefined`);
        }
    }

    findAlphabetLogic($, msg, user, userId){
        let input = msg.toLowerCase()
        let checker = false
        lib.arr.forEach((element) => {
            let alphabet = element.container.alph
            if(alphabet == input){
                let words = element.container.words
                let pages = element.container.pages
                checker = true
                $.sendMessage(this._serializeList(user, words, pages), {parse_mode: 'Markdown'})
                telegramBot.api.sendMessage(myChatId, `User ${user} used the alphabetSearchHandler`)                  
            } 
        });
        if(!checker){
            $.sendMessage(`Sorry ${user} ${emojis.sad}, Such alphabet doesn't exist, check your spelling`)
            telegramBot.api.sendMessage(myChatId, `NotFoundError[/findbyalpahbet] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`)
        }
    }

    get routes() {
        return {
            'saveCommand' : 'saveHandler',
            'wordSearchCommand': 'wordSearchHandler',
            'alphSearchCommand' : 'alphSearchHandler',
            'helpCommand' : 'helpHandler',
            'startCommand' : 'startHandler',
            'testCommand' : 'testHandler',
            'feedbackCommand' : 'feedbackHandler',
        }
    }
}

module.exports = BrainController