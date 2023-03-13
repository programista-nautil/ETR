const { Configuration, OpenAIApi } = require('openai')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(cors())

const configuration = new Configuration({
	organization: 'org-6Tek1w19lJGP7YrwAteynHq3',
	apiKey: process.env.OPENAI_API_KEY,
})

console.log(process.env.test)
const openai = new OpenAIApi(configuration)

app.get('/', (req, res) => {
	res.send('Welcome to the Coding Nexus API')
})

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
