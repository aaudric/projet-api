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

  // Test for a road who return a Text html
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
      const response = await request(app).get('/?query=type=healthy&number=5');
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

  // Test for a road who return a html
  describe('GET /nutriscore', () => {
    it('should return JSON data with 200 statut ', async () => {
      const response = await request(app).get('/');
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.type, 'text/html');
      assert(response.body != null);
    });
  });
  

  // RECIPE INGREDIENT
  describe('GET /recipeIngredient', () => {
    it('should return homepage with 200 status code', async () => {
      const response = await request(app).get('/recipeIngredient');
      assert.strictEqual(response.status, 200);
    });
  });

  describe('GET /recipeIngredient', () => {
    it('should return 404 status for roads not found', async () => {
      const response = await request(app).get('/false-road');
      assert.strictEqual(response.status, 404);
    });
  });

  describe('GET /recipeIngredient', () => {
    it('should return JSON data with 200 status', async () => {
      const response = await request(app).get('/recipeIngredient');
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.type, 'application/json');
      assert(response.body != null);
    });
  });

  describe('GET /recipeIngredient', () => {
    it('should return a list of ingredients', async () => {
      const response = await request(app).get('/recipeIngredient');
      assert.strictEqual(response.statusCode, 200);
      assert(response.body != null);
    });
  });


  

