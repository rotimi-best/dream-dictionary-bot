const interpretations = require("../text/meanings");

const len = v => v.length;

const findByAlphMenu = menuArgs => {
  const [alphabets, bot, callback, scope, user, userId] = menuArgs;
  const menu = [];

  for (const alphabet of alphabets) {
    const option = {
      text: alphabet,
      callback: query => {
        bot.api.answerCallbackQuery(query.id, {
          text: "Searching......"
        });
        callback(scope, alphabet, user, userId);
      }
    };

    menu.push(option);
  }

  return menu;
};

const editWordOrPageQA = (bot, questionCategory, callbackQuery) => {
  const { id, message } = callbackQuery;

  bot.api.answerCallbackQuery(id, {
    text: "Okay :)"
  });

  bot.api.editMessageText(
    `*Which *${questionCategory}* are you looking for?*\n\nSend me, I am waiting...`,
    {
      parse_mode: "Markdown",
      chat_id: message.chat.id,
      message_id: message.messageId
    }
  );
};

const generateMeaning = word => {
  let meaning = "";

  const wordParams = interpretations[word];

  if (wordParams) {
    const { title, introduction, meanings, bibleVerse } = wordParams;
    meaning += `*${title}*\n\n`;
    meaning += len(introduction) ? `_${introduction}_\n\n` : "";
    meaning += meanings.reduce((acc, cur) => (acc += `⚬ ${cur.trim()}\n`), "");
    meaning += len(bibleVerse) ? `\n_${bibleVerse}_` : "";
  }

  return meaning;
};

module.exports = {
  findByAlphMenu,
  editWordOrPageQA,
  generateMeaning
};
