const textract = require("textract");
const fs = require("fs");
const imagesFile = fs.readFileSync("images/images.json", "utf8");
const jsonImages = JSON.parse(imagesFile);

const path = "/text/meaning_old.txt";

const sleep = sec => new Promise(res => setTimeout(res, sec * 1000));

const stream = fs.createWriteStream(`${process.cwd()}/text/meaning_old.txt`, {
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
    for (let i = 22; i < 101; i++) {
      const image = jsonImages.images[i];
      stream.write(`====================== PAGE ${i} ========================`);

      const text = await getImageFromImage(image);

      stream.write(text);

      console.log(`Waiting for 8 seconds then move to page ${i}`);

      await sleep(8);
    }
  } catch (error) {
    console.log(error);
  }
}

appendTextToFile();
// stream.end();
