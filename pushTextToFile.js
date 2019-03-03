const textract = require("textract");
const fs = require("fs");
const imagesFile = fs.readFileSync("images/images.json", "utf8");
const jsonImages = JSON.parse(imagesFile);

const path = "/text/meanings/f.txt";

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
    for (let i = 356; i < 408; i++) {
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
