require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getRagas, getRagaDetails, postRaga} = require('./controller.js')

app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.use(express.static(__dirname+"/public"))

// DEV
app.get('/seed', seed)
app.post('/postRaga', postRaga)
app.get('/ragas/:starttime/:endtime', getRagas)
app.get('/ragas/:ragaid',getRagaDetails)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))