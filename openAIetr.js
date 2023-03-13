const { Configuration, OpenAIApi } = require('openai')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const configuration = new Configuration({
	organization: 'org-6Tek1w19lJGP7YrwAteynHq3',
	apiKey: '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',
})
const openai = new OpenAIApi(configuration)

app.get('/', (req, res) => {
	res.send('Welcome to the Coding Nexus API')
})

// const runPrompt = async () => {
// 	console.log(test)
// 	const prompt = `${userprompt}
//         Przeanalizuj tekst używając wskaźnika FOG i wypisz w punktach jak można poprawić tekst aby był bardziej zrozumiały. Dodatkowo wypisz od myślnika trudne wyrazy które można zamienić i propozycje słów do zamiany.
//     `

// 	const response = await openai.createCompletion({
// 		model: 'text-davinci-003',
// 		prompt: prompt,
// 		max_tokens: 2048,
// 		temperature: 1,
// 	})

// 	const parsableJSONresponse = response.data.choices[0].text

// 	console.log(parsableJSONresponse)
// }

app.post('/message', (req, res) => {
	const response = openai.createCompletion({
		model: 'text-davinci-003',
		prompt: req.body.message,
		temperature: 0,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		max_tokens: 556,
	})

	response
		.then(data => {
			const message = { message: data.data.choices[0].text }
			res.send(message)
		})
		.catch(err => {
			res.send(err)
		})
})

app.listen(3000, () => console.log('Listening on port 3000'))
