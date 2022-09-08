//Dependencies
const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')
const cors = require('cors')

//Endpoint routes
const index = require('./routes/index');

const app = express()

//Middlewares
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(cors())


//Endpoints

app.use('/', index)




  
module.exports = app;
