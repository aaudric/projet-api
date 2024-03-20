/**
 * @swagger
 * /:
 *   get:
 *     summary: Fetch recipes based on query parameters
 *     description: Fetches recipes from the Spoonacular API based on the provided query parameters.
 *     parameters:
 *       - name: type
 *         in: query
 *         description: The type of recipes to fetch (e.g., healthy, vegetarian).
 *         schema:
 *           type: string
 *       - name: number
 *         in: query
 *         description: The number of recipes to fetch.
 *         schema:
 *           type: integer
 *       - name: cuisine
 *         in: query
 *         description: The cuisine of the recipes to fetch (e.g., Italian, Mexican).
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK. Returns the fetched recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       '400':
 *         description: Bad Request. Invalid query parameters provided.
 *       '500':
 *         description: Internal Server Error. Failed to fetch recipes.
 */

/**
 * @typedef IngredientWithNutriScore
 * @property {string} name - The name of the ingredient.
 * @property {string} nutriScore - The Nutri-Score of the ingredient.
 */

/**
 * @typedef Recipe
 * @property {string} id - The ID of the recipe.
 * @property {string} title - The title of the recipe.
 * @property {string} image - The URL of the recipe image.
 * @property {Array<IngredientWithNutriScore>} ingredientsWithNutriScores - The ingredients of the recipe with their Nutri-Scores.
 */

/**
 * @module routes/index
 */

import { Router } from 'express';
import fetch from 'node-fetch';

// Create a new router instance
const router = Router();

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
