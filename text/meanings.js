const supportedAlphabets = ['a', 'u', 'v', 'w', 'x', 'y', 'z'];
let meanings = {};

for (const alphabet of supportedAlphabets) {
  meanings = {
    ...meanings,
    ...require(`./meanings/${alphabet}`)
  }
}

module.exports = meanings;
