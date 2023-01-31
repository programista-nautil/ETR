const textareas = document.querySelectorAll('.textarea')
const finaldecision = document.querySelectorAll('.decision')
const btn1 = document.querySelector('.btn1')
const btn2 = document.querySelector('.btn2')
const btn3 = document.querySelector('.btn3')

let a = 0

const writeTextarea = (fog, a, event) => {
	if (a === 1) {
		final = finaldecision[0]
	} else if (a === 2) {
		final = finaldecision[1]
	} else if (a === 3) {
		final = finaldecision[2]
	}

	if (fog <= 6) {
		final.textContent = 'Bardzo Prosty'
		final.classList.add('btnAnalyzeEasy')
	} else if (fog > 6 && fog < 10) {
		final.textContent = 'Prosty'
		final.classList.add('btnAnalyzeEasy')
	} else if (fog > 9 && fog < 13) {
		final.textContent = 'Dość prosty'
		final.classList.add('btnAnalyzeEasy')
	} else if (fog > 12 && fog < 16) {
		console.log('dosc prosty')
		final.textContent = 'Dość trudny'
		final.classList.add('btnAnalyzeEasy')
	} else if (fog > 15 && fog < 18) {
		final.textContent = 'Trudny'
		final.classList.add('btnAnalyzeHard')
	} else if (fog > 17) {
		final.textContent = 'Bardzo trudny'
		final.classList.add('btnAnalyzeHard')
	}
}

const fog = a => {
	if (a === 1) {
		textarea = textareas[0]
	} else if (a === 2) {
		textarea = textareas[1]
	} else if (a === 3) {
		textarea = textareas[2]
	}

	const text = textarea.value
	const howManyWords = text.split(' ').length
	const sentencesCount = text.match(/\S.*?\."?(?=\s|$)/g)

	let hardWordSyll = 0
	let howManySyl = 0
	const arrayWords = text.split(' ')
	for (word of arrayWords) {
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

	const fog = 0.4 * (howManyWords / sentencesCount.length + 100 * (hardWordSyll / howManyWords))

	writeTextarea(fog, a)
}

//wywołanie funkcji
btn1.addEventListener('click', () => {
	fog(1)
})
btn2.addEventListener('click', () => {
	fog(2)
})
btn3.addEventListener('click', () => {
	fog(3)
})
