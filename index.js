const btn = document.querySelector('.btn')
const btnClear = document.querySelector('.clear')
const spanSentencesCount = document.querySelector('.sentencesCount')
const dataCount = document.querySelectorAll('.dataCount')
const dataIndex = document.querySelectorAll('.dataIndex')
const rangeValue = document.querySelectorAll('.range')

dataIndex.forEach(item => {
	item.textContent = ''
})
rangeValue.forEach(item => {
	item.value = 0
})
dataCount.forEach(item => {
	item.value = ''
})

const btClear = () => {
	const text = document.querySelector('#textInput')
	console.log(text)
	text.value = ''
}

const textAnalytic = () => {
	const text = document.querySelector('#textInput').value

	const words = text.split(' ').length
	const sentences = text.split(/[.?!]/).length
	const syllables = countSyllables(text)

	function countSyllables(word) {
		word = word.toLowerCase()
		if (word.length <= 3) {
			return 1
		}
		word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
		word = word.replace(/^y/, '')
		return word.match(/[aeiouy]{1,2}/g).length
	}

	function countPolysyllables(text) {
		let count = 0
		text.split(' ').forEach(word => {
			if (countSyllables(word) >= 3) {
				count++
			}
		})
		return count
	}

	//wywołanie funkcji
	fleschKincaidReadingEase()
	fleschKincaidGradeLevel()
	fogIndex()
	smogIndex()
	calculateARI()

	//ilość słów
	const howManyWords = text.split(' ').length

	dataCount[1].textContent = words

	//średnia długość słów
	const roundLengthWord = text.split(' ')
	let lengthWordcount = 0
	for (let word of roundLengthWord) {
		lengthWordcount += Number(word.length)
	}

	//ilość zdań

	const sentencesCount = text.match(/\S.*?\."?(?=\s|$)/g)
	try {
		dataCount[0].textContent = Number(sentencesCount.length)
	} catch (error) {
		alert('Zdanie powinno się kończyć kropką.')
		return
	}

	//obliczanie średniej długości zdań w tekście
	let sentencesLength = 0
	sentencesCount.forEach(sentence => {
		sentencesLength += Number(sentence.trim().split(/\s+/).length)
	})

	const sentencesRoundMath = Math.round(sentencesLength / sentencesCount.length)
	dataCount[4].textContent = sentencesRoundMath

	//ilość sylab
	//ilosc słów trudnych > 3
	let hardWordSyll = 0
	let howManySyl = 0
	const arrayWords = text.split(' ')
	for (let word of arrayWords) {
		word = word.toLowerCase()
		word = word.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, '')
		word = word.replace(/^y/, '')
		let syl = word.match(/[aeiouy]{1,2}/g)

		if (syl != null) {
			howManySyl += syl.length
			if (syl.length > 3) {
				hardWordSyll += 1
			}
		}
	}
	dataCount[2].textContent = hardWordSyll

	//średnia ilość sylab w słowach
	const roundSyllWords = howManySyl / howManyWords
	dataCount[5].textContent = Math.round((roundSyllWords + Number.EPSILON) * 10) / 10

	const hardWordPercent = (hardWordSyll / howManyWords) * 100
	dataCount[3].textContent = Math.round((hardWordPercent + Number.EPSILON) * 10) / 10 + ' %'

	//Indeks czytelności Flesch Kincaid Reading Ease
	function fleschKincaidReadingEase() {
		const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)

		let difficulty
		if (score >= 85) {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej klasy 1-6'
		} else if (score >= 65) {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej klasy 7-8'
		} else if (score >= 50) {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej klasy 9-10'
		} else if (score >= 40) {
			difficulty = 'Zrozumienie tekstu na poziomie studiów licencjackich'
		} else if (score >= 20) {
			difficulty = 'Zrozumienie tekstu na poziomie studiów magisterskich'
		} else {
			difficulty = 'Zrozumienie tekstu na bardzo trudnym poziomie'
		}
		rangeValue[0].value = score
		dataIndex[0].textContent = difficulty
		return { score, difficulty }
	}

	//Indeks czytelności Flesch Kincaid Grade Level
	function fleschKincaidGradeLevel() {
		const words = text.split(' ').length
		const sentences = text.split(/[.?!]/).length
		const syllables = countSyllables(text)
		const score = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59
		let difficulty
		if (score >= 12) {
			difficulty = 'Zrozumienie tekstu na bardzo trudnym poziomie'
		} else if (score >= 10) {
			difficulty = 'Zrozumienie tekstu na poziomie studiów magisterskich'
		} else if (score >= 8) {
			difficulty = 'Zrozumienie tekstu na poziomie studiów licencjackich'
		} else if (score >= 7) {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej klasy 9-10'
		} else if (score >= 4) {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej klasy 7-8'
		} else if (score >= 0) {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej klasy 1-6'
		} else {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej przedszkolnym'
		}
		rangeValue[1].value = score
		dataIndex[1].textContent = difficulty
		return { score, difficulty }
	}

	//Indeks czytelności FOG
	function fogIndex() {
		const words = text.split(' ').length
		const sentences = text.split(/[.?!]/).length
		const syllables = countSyllables(text)
		const score = 0.4 * (words / sentences + 100 * (syllables / words))
		let difficulty
		if (score >= 12) {
			difficulty = 'Zrozumienie tekstu na bardzo trudnym poziomie'
		} else if (score >= 10) {
			difficulty = 'Zrozumienie tekstu na poziomie studiów magisterskich'
		} else if (score >= 8) {
			difficulty = 'Zrozumienie tekstu na poziomie studiów licencjackich'
		} else if (score >= 7) {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej klasy 7-8'
		} else {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej klasy 1-6'
		}
		rangeValue[2].value = score
		dataIndex[2].textContent = difficulty
		console.log({ score, difficulty })
		return { score, difficulty }
	}

	//SMOG Index
	function smogIndex() {
		const polysyllables = countPolysyllables(text)
		const score = 1.043 * Math.sqrt(polysyllables * (30 / sentences)) + 3.1291
		let difficulty
		if (score >= 12) {
			difficulty = 'Zrozumienie tekstu na bardzo trudnym poziomie'
		} else if (score >= 10) {
			difficulty = 'Zrozumienie tekstu na poziomie studiów magisterskich'
		} else if (score >= 8) {
			difficulty = 'Zrozumienie tekstu na poziomie studiów licencjackich'
		} else if (score >= 7) {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej klasy 7-8'
		} else {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej klasy 1-6'
		}
		rangeValue[4].value = score
		dataIndex[4].textContent = difficulty
		return { score, difficulty }
	}

	//Pisarka
	const pisarekCriteria = {
		bardzoProsty: [0, 3, 'Zrozumienie tekstu na poziomie nauki czytania'],
		prosty: [3, 7, 'Zrozumienie tekstu na poziomie szkoły podstawowej'],
		dosycProsty: [7, 15, 'Zrozumienie tekstu na poziomie szkoły licealnej'],
		dosycTrudny: [15, 17, 'Zrozumienie tekstu na poziomie szkoły wyższej'],
		trudny: [17, 'Zrozumienie tekstu na poziomie pism naukowych'],
	}
	const pisarek = Math.sqrt(Math.pow(sentencesRoundMath, 2) + Math.pow(hardWordPercent, 2)) / 2
	rangeValue[3].value = pisarek
	console.log('pisarek - ' + pisarek)
	//dataIndex[3].textContent = Math.round((pisarek + Number.EPSILON) * 10) / 10

	if (pisarek <= pisarekCriteria.bardzoProsty[1]) {
		dataIndex[3].textContent = pisarekCriteria.bardzoProsty[2]
	} else if (pisarek >= pisarekCriteria.prosty[0] && pisarek <= pisarekCriteria.prosty[1]) {
		dataIndex[3].textContent = pisarekCriteria.prosty[2]
	} else if (pisarek >= pisarekCriteria.dosycProsty[0] && pisarek <= pisarekCriteria.dosycProsty[1]) {
		dataIndex[3].textContent = pisarekCriteria.dosycProsty[2]
	} else if (pisarek >= pisarekCriteria.dosycTrudny[0] && pisarek <= pisarekCriteria.dosycTrudny[1]) {
		dataIndex[3].textContent = pisarekCriteria.dosycTrudny[2]
	} else if (pisarek >= pisarekCriteria.trudny[0]) {
		dataIndex[3].textContent = pisarekCriteria.trudny[1]
	}

	//Automated Readability Index
	function calculateARI() {
		let charCount = text.replace(/[^a-zA-Z]/g, '').length
		let score = 4.71 * (charCount / words) + 0.5 * (words / sentences) - 21.43

		if (score >= 21) {
			difficulty = 'Zrozumienie tekstu na bardzo trudnym poziomie'
		} else if (score >= 18 && score <= 20) {
			difficulty = 'Zrozumienie tekstu na poziomie studiów magisterskich'
		} else if (score >= 15 && score <= 17) {
			difficulty = 'Zrozumienie tekstu na poziomie studiów licencjackich'
		} else if (score >= 12 && score <= 14) {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej klasy 9-10'
		} else if (score >= 9 && score <= 11) {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej klasy 7-8'
		} else if (score >= 6 && score <= 8) {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej klasy 1-6'
		} else {
			difficulty = 'Zrozumienie tekstu na poziomie szkoły podstawowej przedszkolnym'
		}
		rangeValue[5].value = score
		dataIndex[5].textContent = difficulty
	}
}

btn.addEventListener('click', textAnalytic)
btnClear.addEventListener('click', btClear)
