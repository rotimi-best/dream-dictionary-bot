// Pick a random word in an array and find it and its pages

for(let i=0; i<8; i++){
	let wrd = Math.floor(Math.random() * 26) + 1
	// console.log(wrd)
	let alph = lib.arr[wrd].container.alph
	let arr = lib.arr[wrd].container.words
	let rand = arr[Math.floor(Math.random() * arr.length)];
	console.log(`Letter: ${alph}, Word: ${rand}`)
	// console.log(rand)
	handleSearch(rand)
}

// Show alphabet and the lenght of words it possess in the dictionary

let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
letters.forEach(function(val,index, array){
	let len = handleAlph(val)
	console.log('Alphabet: ', val, '. Length: ', len)
})

// Server https://glitch.com/edit/#!/dream-dictionary?path=server.js:1:0

/* Commands 

findbyword - Find page & interpretation of any word in dictionary
findbyalphabet - See all words under an alphabet
spellchecker - I can check & suggest spellings 4 u
help - See all i can do

*/

/**
 * New kind of error message:
 * No processor found for update: Update {

  _updateId: 124103339,

  _message: null,

  _editedMessage: null,

  _channelPost: 

   Message {

     _messageId: 116,

     _from: null,

     _date: 1535325843,

     _chat: 

      Chat {

        _id: -1001315390402,

        _type: 'channel',

        _title: 'SKY BET|БЕСПЛАТНЫЕ ПРОГНОЗЫ НА СПОРТ💸',

        _username: 'skyybet',

        _firstName: null,

        _lastName: null,

        _allMembersAreAdministrators: null },

     _forwardFrom: null,

     _forwardFromChat: null,

     _forwardFromMessageId: null,

     _forwardDate: null,

     _replyToMessage: null,

     _editDate: null,

     _text: 'Пока не поздно, ставьте с нами )',

     _entities: null,

     _audio: null,

     _document: null,

     _game: null,

     _photo: null,

     _sticker: null,

     _video: null,

     _voice: null,

     _caption: null,

     _contact: null,

     _location: null,

     _venue: null,

     _newChatMember: null,

     _leftChatMember: null,

     _newChatTitle: null,

     _newChatPhoto: null,

     _deleteChatPhoto: null,

     _groupChatCreated: null,

     _supergroupChatCreated: null,

     _channelChatCreated: null,

     _migrateToChatId: null,

     _migrateFromChatId: null,

     _pinnedMessage: null },

  _editedChannelPost: null,

  _inlineQuery: null,

  _chosenInlineResult: null,

  _callbackQuery: null }

 * 
 */