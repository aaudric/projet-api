import cors from 'cors';
import express from 'express';
import logger from 'pino-http';
import indexRoute from './routes/index.js';

// Initialize the express app
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Configure logger
app.use(logger({ level: process.env.NODE_ENV === 'test' ? 'error' : 'info' }));

// Set up routes
app.use('/', indexRoute);

export default app;


