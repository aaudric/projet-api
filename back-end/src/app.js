import cors from 'cors';
import express from 'express';
import logger from 'pino-http';
import indexRoute from './routes/index.js';
import recipes from './routes/recipes.js';
import nutriscore from './routes/nutriscore.js';
import recipeIngredient from './routes/recipeIngredient.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


// Initialize the express app
const app = express();  

// Setting options object for swagger-jsdoc
const swaggerOptions = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Express API for Recipes and  Nutrition',
        version: '2.0',
        description: 'A simple API for fetching nutritional recipes'
      },
      servers: [
        {
          url: 'http://localhost:3000'
        }
      ],
    },
    // Road to our Routes with the comments for API's documentation 
    apis: ['./src/routes/*.js'], 
  };

const swaggerDocs = swaggerJSDoc(swaggerOptions);


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

app.use('/', recipes);

app.use('/',nutriscore);

app.use('/',recipeIngredient);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)) ;

export default app;


