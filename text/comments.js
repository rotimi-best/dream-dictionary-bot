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