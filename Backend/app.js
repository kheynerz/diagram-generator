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
const structure = require('./routes/structure');
const projects = require('./routes/projects');

//Endpoints
app.use('/', index)
app.use('/', install)
app.use('/', structure)
app.use('/', projects)

  
module.exports = app;
