const lib = require('./text/libArray')

function handleSearch(val){
	let input = val.trim().replace(/ /g, '');
	let found = false
	let matched, reger, page
	let firstLetter = input.match(/\w/);
	lib.arr.forEach((element) => {
		let alphabet = element.container.alph
		if(alphabet == firstLetter['0']){
			let words = element.container.words
			words.forEach((el, index) => {
				let reg = new RegExp('\\b' + input + '\\b', 'gi')
				reger = reg
				let matchWord = el.match(reg)
				if(matchWord){
					found = true
					matched = matchWord['0']
					page = element.container.pages[index]
				}
			})
		}	
	});
	if(found){
		console.log('Reg: ', reger )		
		// console.log('Hurray, found. The word is: ', matched.charAt(0).toUpperCase(), 'in page: ', page)
		console.log(`Hurray, found. The word is: ${matched.charAt(0).toUpperCase() + matched.slice(1)} in page: ${page}`)
	} else {
		console.log('Reg: ', reger )
		console.log(`Sorry ${input} was not found, try adding a (s) to the end of the word`)
	}
}

// Function for finding all the words in an alphabet

function handleAlph(val){
	let input = val.trim()
	// let word_len, pages_len
	let checker = false
	lib.arr.forEach((element) => {
		let alphabet = element.container.alph
		if(alphabet == input){
			console.log('Here are all the words in the alphabet')
			let words = element.container.words
			let pagesArr = element.container.pages
			checker = true
			words.forEach((el, index) => {
				console.log(`${el} => ${pagesArr[index]}`)
			})
		} 
	});
	if(!checker){
		console.log('Such alphabet doesn\'t exist, check your spelling')
	}
}

// Export all modules
module.exports = {
	searcher: handleSearch,
	alp: handleAlph,
}





