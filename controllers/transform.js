// let words = text.split(/[\r\n]+/)
// let r = /\bz\w+\b/g; 
// ^a\w+
// let reger = `/\\b${a}\\w+\\b/g`;
// let reger = /c\w+[\r\n]/g;

const makeTextToJson = () => {
    // let fs =  require('fs')
    // let text = fs.readFileSync("./text/alphabets.txt", "utf-8");
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    // let file = fs.createWriteStream("./text/words.js");
    // file.write('let lib = {\n')
    letters.forEach(function(val,index, array){
        console.log()
        // let reg = new RegExp('\\b' + val + '\\w+\\b', 'gi')
        // let words = text.match(reg);
        // file.write('\tval : {\n');
        // file.write('\t\talph : ' + val + ',\n');
        // file.write('\t\tdata : [ ' + words + ' ],' + '\n');
        // file.write('\t},\n');
    })
    // file.write('}')
    // file.end();
}
makeTextToJson();
// let str = 'rovvvg igkbh iugkhst'
// let test = (str).match(/^\w/);
// console.log(test['0'])
