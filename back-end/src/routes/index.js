import { Router } from 'express';
import fetch from 'node-fetch';
// Import necessary modules

// Create a new router instance
const router = Router();

// Define a route handler for the root endpoint
router.get('/', async (req, res) => {
  const type = req.query.type || 'healthy';
  const number = req.query.number || 10;

  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${type}&number=${number}&addRecipeInformation=true&apiKey=${process.env.SPOONACULAR_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    const recipes = data.results;

    // Traitement asynchrone des ingrédients pour chaque recette
    await Promise.all(recipes.map(async (recipe) => {
      // Assurez-vous que la structure des données correspond à ce que vous attendez
      const ingredientPromises = recipe.analyzedInstructions[0]?.steps.flatMap(step => step.ingredients).map(async (ingredient) => {
        const ingredientName = ingredient.name;
        const url2 = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(ingredientName)}&fields=product_name,nutriscore_grade&json=true`;
        try {
          const response2 = await fetch(url2);
          if (!response2.ok) {
            throw new Error(`HTTP Error: ${response2.status}`);
          }
          const data2 = await response2.json();
          if (data2.products.length > 0) {
            return { name: ingredientName, nutriScore: data2.products[0].nutriscore_grade || 'Unknown' };
          } else {
            return { name: ingredientName, nutriScore: 'Not Found' };
          }
        } catch (error) {
          console.error(`Error retrieving Nutri-Score for ${ingredientName}:`, error);
          return { name: ingredientName, nutriScore: 'Error retrieving Nutri-Score' };
        }
      });

      // Attendre que toutes les promesses pour les ingrédients d'une recette soient résolues
      const ingredientsWithScores = await Promise.all(ingredientPromises);
      recipe.ingredientsWithNutriScores = ingredientsWithScores;
    }));

    // Envoyer les recettes enrichies en réponse
    res.json(recipes);
  } catch (error) {
    console.error('Error retrieving recipes:', error);
    res.status(500).json({ error: 'Error retrieving recipes' });
  }
});


// Export the router as the default module
export default router;

