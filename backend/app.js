//Dependencies
import express, { json } from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';

//Endpoint routes
import index from './routes/index';

const app = express()

//Middlewares
app.use(helmet())
app.use(logger('dev'))
app.use(json())
app.use(cors())


//Endpoints

app.use('/', index)




  
export default app;
