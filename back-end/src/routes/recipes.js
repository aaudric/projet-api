import { Router } from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get recipes based on query parameters
 *     description: Retrieve recipes based on the provided query parameters.
 *     parameters:
 *       - name: type
 *         in: query
 *         description: The type of recipes to retrieve (e.g. healthy, vegetarian, etc.)
 *         required: false
 *         schema:
 *           type: string
 *       - name: number
 *         in: query
 *         description: The number of recipes to retrieve
 *         required: false
 *         schema:
 *           type: integer
 *       - name: cuisine
 *         in: query
 *         description: The cuisine type of the recipes to retrieve (e.g. Italian, Mexican, etc.)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the retrieved recipes
 *         content:
 *           application/json:
 *             schema:
 *               type : object
 *       '500':
 *         description: Internal server error occurred while retrieving recipes
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 */



// Create a new router instance
const router = Router();

// Route handler for fetching recipes based on query parameters
router.get('/recipes', async (req, res) => {
    // Retrieve query parameters or use default values
    const type = req.query.type || 'healthy';
    const number = req.query.number || 1;
    const cuisine = req.query.cuisine || 'Italian';
    const apiKey = process.env.SPOONACULAR_API_KEY;
        
    // Construct the URL for fetching recipes
    const recipesUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${type}&number=${number}&cuisine=${cuisine}&addRecipeInformation=true&fillIngredients=true&apiKey=${apiKey}`;
    try {
        // Fetch recipes from the Spoonacular API
        const recipesResponse = await fetch(recipesUrl);
        if (!recipesResponse.ok) throw new Error(`HTTP Error: ${recipesResponse.status}`);
        const recipesData = await recipesResponse.json();
        // Send the retrieved recipes as a JSON response
        res.json(recipesData);
        
    } catch (error) {
        // Handle errors and send an error response
        console.error(`Error retrieving recipes:`, error);
        res.status(500).json({ error: `Error retrieving recipes` });
    }
});

export default router;
