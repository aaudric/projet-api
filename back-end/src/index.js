/**
 * Import required modules.
 */
import http from 'node:http';
import app from './app.js';
import 'dotenv/config';

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;
server.listen(port);

/**
 * Event listener for server 'listening' event.
 */
server.on('listening', () => {
  const addr = server.address();
  console.log(`Listening on port ${addr.port}`);
});

/**
 * Event listener for server 'error' event.
 */
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // Handle specific listen errors with friendly messages.
  switch (error.code) {
    case 'EACCES': {
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    }
    case 'EADDRINUSE': {
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    }
    default:
      throw error;
  }
});

/*const apiKey = process.env.SPOONACULAR_API_KEY;

const type = "healthy"

// Fonction pour effectuer la requête et afficher les résultats
function getHealthyRecipes(apiKey,type, number) {

  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${type}&number=${number}&addRecipeInformation=true&apiKey=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Recettes saines:', data.results);
      // Traitez ici les données reçues, par exemple en les affichant dans votre page web
      data.results.forEach(recipe => {
        console.log(`Titre: ${recipe.title}, ID: ${recipe.id}`);
      });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des recettes:', error);
    });
}
getHealthyRecipes(apiKey,type,1);*/