import cors from 'cors';
import express from 'express';
import logger from 'pino-http';
import indexRoute from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';



// Initialize the express app
const app = express();  

// Définition de l'objet d'options pour swagger-jsdoc
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
    // Chemin vers les fichiers contenant les commentaires de documentation de l'API
    apis: ['./src/routes/*.js'], // Assurez-vous que ce chemin correspond à votre structure de projet
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)) ;

export default app;


