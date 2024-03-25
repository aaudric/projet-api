import { Router } from 'express';
import fetch from 'node-fetch';

/**
 * @swagger
 * /nutriscore:
 *   get:
 *     summary: Get Nutri-Score for an ingredient
 *     description: Retrieve the Nutri-Score for a given ingredient.
 *     parameters:
 *       - in: query
 *         name: ingredient
 *         required: true
 *         description: The ingredient to get the Nutri-Score for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the ingredient.
 *                 nutriScore:
 *                   type: string
 *                   description: The Nutri-Score of the ingredient.
 *       404:
 *         description: Nutri-Score not found for the ingredient.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message.
 */


// Create a new router instance
const router = Router();
router.get('/nutriscore', async (req, res) => {
    // Define the ingredient
    const ingredient = req.query.ingredient||"Tomato" ;
    // Construct the URL for the API request
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(ingredient)}&fields=product_name,nutriscore_grade&json=true`;
    try {
        // Send the API request
        const response = await fetch(url);
        // Check if the response is successful
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        // Parse the response data
        const data = await response.json();
        // Check if the Nutri-Score is found for the ingredient
        if (data.products.length > 0) {
            // Return the ingredient name and Nutri-Score
            res.json({ name: ingredient, nutriScore: data.products[0].nutriscore_grade || 'Unknown' });
        } else {
            // Return an error message if Nutri-Score is not found
            res.status(404).json({ message: `Nutri-Score not found for ingredient: ${ingredient}` });
        }
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error(`Error retrieving Nutri-Score for ${ingredient}:`, error);
        res.status(500).json({ error: `Error retrieving Nutri-Score for ${ingredient}` });
    }
});
export default router;
