function findByAlphMenu(menuArgs) {
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
}

module.export = {
  findByAlphMenu
};
