import express from 'express';
import logger from 'pino-http';
import indexRoute from './routes/index.js';
import'dotenv/config.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger({ level: process.env.NODE_ENV === 'test' ? 'error' : 'info' }));

app.use('/', indexRoute);

export default app;
