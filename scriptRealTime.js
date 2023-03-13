const editor = document.getElementById('editor')
const preview = document.getElementById('preview')
const saveButton = document.getElementById('save-button')

editor.addEventListener('input', () => {
	const text = editor.textContent.trim()
	const paragraphs = text.split(/\n+/)

	const previewHTML = paragraphs
		.map(paragraph => {
			const sentences = paragraph.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/g)
			const sentenceHTML = sentences
				.map(sentence => {
					const words = sentence.split(' ')
					const modifiedWords = words.map(word => {
						// check if the word is difficult to read
						if (word.length > 4 && !/^[A-Z]+$/.test(word) && !/^[a-z]+$/.test(word)) {
							return `<span class="hard-word">${word}</span>`
						}
						return word
					})
					return `<span class="sentence">${modifiedWords.join(' ')}</span>`
				})
				.join('')

			return `<div class="paragraph">${sentenceHTML}</div>`
		})
		.join('')

	preview.innerHTML = previewHTML
})

saveButton.addEventListener('click', () => {
	const editor = document.getElementById('editor')
	let lines = editor.innerText.trim().split('\n')
	let text = ''

	for (let i = 0; i < lines.length; i++) {
		text += lines[i].trim()
		if (i < lines.length - 1) {
			text += ' \n'
		}
	}

	console.log(text)
})
