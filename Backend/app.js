//Dependencies
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


//Endpoint routes
const index = require('./routes/index');
const install = require('./routes/install');


//Endpoints
app.use('/', index)
app.use('/', install)



  
module.exports = app;
