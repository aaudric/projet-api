import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';
import 'dotenv/config';
import nock from 'nock';

  
  // Test for homepage 
  describe('GET /', () => {
    it('should return homepage with 200 status code', async () => {
      const response = await request(app).get('/');
      assert.strictEqual(response.status, 200);
    });
  });

  // Test for a false road
  describe('GET /', () => {
    it('should return 404 statut for roads not found', async () => {
      const response = await request(app).get('/false-road');
      assert.strictEqual(response.status, 404);
    });
  });

  describe('GET /', () => {
    it('should return homepage with 200 status code and body containing "Hello World!"', async () => {
      const response = await request(app).get('/');
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.text, 'Hello World!'); 
    });
  });
  

// RECIPES
// Test for homepage 
  describe('GET /recipes', () => {
    it('should return homepage with 200 status code', async () => {
      const response = await request(app).get('/');
      assert.strictEqual(response.status, 200);
    });
  });

  // Test for a false road
  describe('GET /recipes', () => {
    it('should return 404 statut for roads not found', async () => {
      const response = await request(app).get('/false-road');
      assert.strictEqual(response.status, 404);
    });
  });

  // Test for a road who return a JSON
  describe('GET /recipes', () => {
    it('should return JSON data with 200 statut ', async () => {
      const response = await request(app).get('/');
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.type, 'text/html');
      assert(response.body != null);
    });
  });

  // Test for a list of recipes
  describe('GET /recipes', () => {
    it('should return a list of recipes', async () => {
      const response = await request(app).get('/?query=ype=healthy&number=5');
      assert.strictEqual(response.statusCode, 200);
      assert(response.body != null);
    });
  });


// NUTRISCORE
// Test for homepage
  describe('GET /nutriscore', () => {
    it('should return homepage with 200 status code', async () => {
      const response = await request(app).get('/');
      assert.strictEqual(response.status, 200);
    });
  });

  // Test for a false road
  describe('GET /nutriscore', () => {
    it('should return 404 statut for roads not found', async () => {
      const response = await request(app).get('/false-road');
      assert.strictEqual(response.status, 404);
    });
  });

  // Test for a road who return a JSON
  describe('GET /nutriscore', () => {
    it('should return JSON data with 200 statut ', async () => {
      const response = await request(app).get('/');
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.type, 'text/html');
      assert(response.body != null);
    });
  });
  
  


 /*  describe('GET / (Fetching recipes and enriching with Nutri-Score)', () => {
    it('should return enriched recipes data', async () => {
      // Simulate the Spoonacular API response
      nock('https://api.spoonacular.com')
        .get('/recipes/complexSearch')
        .query(true) // For simplicity, we capture any request matching the path and parameters
        .reply(200, {
          results: [{
            id: 12345,
            title: "Test Recipe",
            analyzedInstructions: [{
              steps: [{
                ingredients: [{ name: "Tomato" }]
              }]
            }]
          }]
        });
  
      // Simulate the response of the OpenFoodFacts API for the ingredient Tomato
      nock('https://world.openfoodfacts.org')
        .get('/cgi/search.pl')
        .query(true) // Capture any request with the right parameters
        .reply(200, {
          products: [{
            product_name: "Tomato",
            nutriscore_grade: "a"
          }]
        });
  
      // Perform the request to your API's route
      const response = await request(app).get('/?type=healthy&number=10&cuisine=Italian');
  
      // Check that the response is correct by using assert
      assert.strictEqual(response.status, 200, "Response status should be 200");
      assert.strictEqual(response.body.length, 1, "Response should contain one recipe");
      assert.strictEqual(response.body[0].title, "Test Recipe", "The recipe title should match");
      assert.deepStrictEqual(response.body[0].ingredientsWithNutriScores, [{ name: "Tomato", nutriScore: "a" }], "The ingredients with NutriScores should match the expected output");
    });
  });

  describe('GET / (Fetching recipes and handling unknown Nutri-Score)', () => {
    it('should return "Not Found" Nutri-Score for an ingredient not found', async () => {
      // Simulate the Spoonacular API response
      nock('https://api.spoonacular.com')
        .get('/recipes/complexSearch')
        .query(true) 
        .reply(200, {
          results: [{
            id: 67890,
            title: "Ingredient Test Recipe",
            analyzedInstructions: [{
              steps: [{
                ingredients: [{ name: "Unknown Ingredient" }]
              }]
            }]
          }]
        });
  
      // Simulate the response of the OpenFoodFacts API for the ingredient "Unknown Ingredient"
      nock('https://world.openfoodfacts.org')
        .get('/cgi/search.pl')
        .query({search_terms: "Unknown Ingredient", fields: 'product_name,nutriscore_grade', json: true})
        .reply(200, {
          products: [] // No products found
        });
  
      
      const response = await request(app).get('/?type=healthy&number=1&cuisine=Italian');
  
      assert.strictEqual(response.status, 200, "Response status should be 200");
      assert.strictEqual(response.body.length, 1, "Response should contain one recipe");
      assert.strictEqual(response.body[0].title, "Ingredient Test Recipe", "The recipe title should match");
      assert.deepStrictEqual(response.body[0].ingredientsWithNutriScores, [{ name: "Unknown Ingredient", nutriScore: "Not Found" }], "The ingredient Nutri-Score should be 'Unknown'");
    });
  });
*/

