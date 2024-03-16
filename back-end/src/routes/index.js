import { Router } from 'express';
import fetch from 'node-fetch';
// Import necessary modules

// Create a new router instance
const router = Router();

// Define a route handler for the root endpoint
router.get('/', async (req, res) => {
  // Get query parameters or use default values
  const type = req.query.type || 'healthy';
  const number = req.query.number || 10;
  const cuisine = req.query.cuisine || 'Italian';

  // Construct the URL for the Spoonacular API
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${type}&number=${number}&cuisine=${cuisine}&addRecipeInformation=true&apiKey=${process.env.SPOONACULAR_API_KEY}`;

  try {
    // Fetch data from the Spoonacular API
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    const recipes = data.results;

    // Asynchronously process ingredients for each recipe
    await Promise.all(recipes.map(async (recipe) => {
      // Make sure the data structure matches the expected format
      const ingredientPromises = recipe.analyzedInstructions[0]?.steps.flatMap(step => step.ingredients).map(async (ingredient) => {
        const ingredientName = ingredient.name;
        const url2 = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(ingredientName)}&fields=product_name,nutriscore_grade&json=true`;

        try {
          // Fetch data from the Open Food Facts API
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

      // Wait for all promises for the ingredients of a recipe to be resolved
      const ingredientsWithScores = await Promise.all(ingredientPromises);
      recipe.ingredientsWithNutriScores = ingredientsWithScores;
    }));

    // Send the enriched recipes as the response
    res.json(recipes);
  } catch (error) {
    console.error('Error retrieving recipes:', error);
    res.status(500).json({ error: 'Error retrieving recipes' });
  }
});

// Export the router as the default module
export default router;