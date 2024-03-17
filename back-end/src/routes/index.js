import { Router } from 'express';
import fetch from 'node-fetch';
// Import necessary modules

// Create a new router instance
const router = Router();

/**
 * @swagger
 * api/recipes:
 *   get:
 *     summary: Returns a list of recipes
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Type of the recipe
 *       - in: query
 *         name: number
 *         schema:
 *           type: integer
 *         description: Number of recipes to return
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 */



// Route handler for fetching recipes based on query parameters
router.get('/', async (req, res) => {
  // Retrieve query parameters or use default values
  const type = req.query.type || 'healthy';
  const number = req.query.number || 10;
  const cuisine = req.query.cuisine || 'Italian';

  // Construct the URL for the Spoonacular API request
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${type}&number=${number}&cuisine=${cuisine}&addRecipeInformation=true&apiKey=${process.env.SPOONACULAR_API_KEY}`;

  try {
    // Fetch data from the Spoonacular API
    const response = await fetch(url);

    // Throw an error if the response from the API is not OK
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Parse the JSON response from the API
    const data = await response.json();
    const recipes = data.results;

    // Check if the recipes array is empty (no recipes found)
    if (!recipes || recipes.length === 0) {
      // Send a 404 response with a message indicating no recipes were found
      return res.status(404).json({ message: `No recipes found for type: ${type}, cuisine: ${cuisine}, and number: ${number}.` });
    }

    // Process each recipe asynchronously
    await Promise.all(recipes.map(async (recipe) => {
      // Extract ingredients from each recipe and fetch their Nutri-Score
      const ingredientPromises = recipe.analyzedInstructions[0]?.steps.flatMap(step => step.ingredients).map(async (ingredient) => {
        const ingredientName = ingredient.name;
        const url2 = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(ingredientName)}&fields=product_name,nutriscore_grade&json=true`;

        try {
          // Fetch data from the Open Food Facts API for each ingredient
          const response2 = await fetch(url2);

          if (!response2.ok) {
            throw new Error(`HTTP Error: ${response2.status}`);
          }

          const data2 = await response2.json();

          // Return the ingredient name and its Nutri-Score, if found
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

      // Wait for all ingredient Nutri-Score promises to resolve and attach them to the recipe
      const ingredientsWithScores = await Promise.all(ingredientPromises);
      recipe.ingredientsWithNutriScores = ingredientsWithScores;
    }));

    // Send the enriched recipes as the response
    res.json(recipes);
  } catch (error) {
    // Log and respond with an error if the API request fails
    console.error('Error retrieving recipes:', error);
    res.status(500).json({ error: 'Error retrieving recipes' });
  }
});

export default router;
