const textract = require("textract");
const fs = require("fs");
const imagesFile = fs.readFileSync("images/images.json", "utf8");
const jsonImages = JSON.parse(imagesFile);

const pages = [
  { alph: "g", min: 408, max: 444 },
  { alph: "h", min: 444, max: 485 },
  { alph: "i", min: 485, max: 501 },
  { alph: "j", min: 501, max: 513 },
  { alph: "k", min: 513, max: 526 },
  { alph: "l", min: 526, max: 561 },
  { alph: "m", min: 561, max: 592 },
  { alph: "n", min: 592, max: 607 },
  { alph: "o", min: 607, max: 620 },
  { alph: "p", min: 620, max: 671 },
  { alph: "q", min: 671, max: 677 },
  { alph: "r", min: 677, max: 702 },
  { alph: "s", min: 702, max: 751 },
  { alph: "t", min: 751, max: 774 },
  { alph: "u", min: 774, max: 816 },
  { alph: "y", min: 816, max: 823 },
  { alph: "z", min: 823, max: 827 }
];


// const index = 9; // 16 Not ran yet
// const index = 10; // 16
// const index = 11; // 16
// const index = 12; // 16
// const index = 13; // 16
// const index = 14; // 16
// const index = 15; // 16
// const index = 16; // 16

const path = `/text/meanings/${pages[index].alph}.txt`;

const sleep = sec => new Promise(res => setTimeout(res, sec * 1000));

const stream = fs.createWriteStream(`${process.cwd()}${path}`, {
  flags: "a"
});

function getImageFromImage(imageUrl) {
  return new Promise(async (resolve, reject) => {
    textract.fromUrl(
      imageUrl,
      {
        preserveLineBreaks: true,
        typeOverride: "image/jpeg"
      },
      function(error, text) {
        if (error) reject(error);
        resolve(text);
      }
    );
  });
}

async function appendTextToFile() {
  try {
    for (let i = pages[index].min; i < pages[index].max; i++) {
      const image = jsonImages.images[i] || "";

      if (image.length) {
        stream.write(
          `====================== PAGE ${i} ========================`
        );

        const text = await getImageFromImage(image);

        stream.write(text);

        console.log(`Waiting for 8 seconds then move to page ${i + 1}`);

        await sleep(8);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

appendTextToFile();
// stream.end();
