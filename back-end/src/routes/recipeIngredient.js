import { Router } from 'express';
import fetch from 'node-fetch';

// Create a new router instance
const router = Router();

router.get('/recipeIngredient', async (req, res) => {
    // Paramètres de la requête à la première API
    const type = req.query.type || 'healthy';
    const number = req.query.number || 10;
    const cuisine = req.query.cuisine || 'Italian';
    const apiKey = process.env.SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${type}&number=${number}&cuisine=${cuisine}&addRecipeInformation=true&fillIngredients=true&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        
        // Traitement asynchrone pour chaque recette
        const enrichedRecipes = await Promise.all(data.results.map(async (recipe) => {
            const enrichedIngredients = await Promise.all(recipe.extendedIngredients.map(async (ingredient) => {
                // Construction de l'URL pour la seconde API
                const nutriScoreUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(ingredient.name)}&fields=product_name,nutriscore_grade&json=true`;
                
                try {
                    const nutriScoreResponse = await fetch(nutriScoreUrl);
                    if (!nutriScoreResponse.ok) throw new Error(`HTTP Error: ${nutriScoreResponse.status}`);
                    const nutriScoreData = await nutriScoreResponse.json();
                    
                    // Ajout du Nutri-Score à l'ingrédient
                    ingredient.nutriScore = nutriScoreData.products.length > 0 ? nutriScoreData.products[0].nutriscore_grade : 'Unknown';
                } catch (error) {
                    console.error(`Error retrieving Nutri-Score for ${ingredient.name}:`, error);
                    ingredient.nutriScore = 'Error retrieving Nutri-Score';
                }
                return ingredient;
            }));
            
            // Ajout des ingrédients enrichis à la recette
            recipe.extendedIngredients = enrichedIngredients;
            return recipe;
        }));

        res.json(enrichedRecipes);
    } catch (error) {
        console.error('Error retrieving recipes:', error);
        res.status(500).json({ error: 'Error retrieving recipes' });
    }
});


export default router;