import { Router } from 'express';
import 'dotenv/config.js';

// nouvelle instance routeur
const router = Router();
// api key who's situed in the file  .env
const apiKey = process.env.SPOONACULAR_API_KEY;

// Définition d'une route GET sur le chemin racine ('/') de ce routeur
router.get('/', async (req, res) => {
  // Récupération des paramètres de requête 'type' et 'number', avec des valeurs par défaut si non spécifiés
  const type = req.query.type || 'healthy'; // Type de recettes à rechercher, 
  const number = req.query.number || 10; // Nombre de recettes à retourner

  //URL pour l'API Spoonacular 
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${type}&number=${number}&addRecipeInformation=true&apiKey=${apiKey}`;

  try {
    // Envoi de la requête à l'API Spoonacular et attente de la réponse avec await 
    const response = await fetch(url);
    //   si erreur alors statut erreur
    if (!response.ok) {
      // Lancement d'une exception si la réponse est une erreur, incluant le code de statut HTTP
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    // Extraction et conversion de la réponse en JSON
    const data = await response.json();
    const id = data.results.id;
    // Envoi des résultats (partie 'results' de la réponse JSON) au client
    res.json(data.results);    
  } catch (error) {
    // Gestion des erreurs, notamment les erreurs réseau ou de l'API Spoonacular
    console.error('Erreur lors de la récupération des recettes:', error);
    // Envoi d'une réponse d'erreur 500 (Erreur Interne du Serveur) au client avec un message d'erreur
    res.status(500).json({ error: 'Erreur lors de la récupération des recettes' });
  }
});

// Exportation du routeur pour son utilisation dans le fichier principal de l'application Express
export default router;

