const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')
const cors = require('cors')


const app = express()

//Middlewares
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(cors())

//Routes
const indexRoute = require('./routes/index')


app.use(indexRoute);

module.exports = app;