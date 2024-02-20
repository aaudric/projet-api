import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
  it('should return homepage with 200 status code', async () => {
    const response = await request(app).get('/');
    assert.strictEqual(response.status, 200);
  });
});

//Tests globaux pour l'application
describe('Tests d\'application Express', () => {
  
  // Test for homepage 
  describe('GET /', () => {
    it('should return homepage with 200 statut', async () => {
      const response = await request(app).get('/');
      assert.strictEqual(response.status, 200);
    });
  });

  // Test pour une route inexistante
  describe('GET /', () => {
    it('should return 404 statut for roads not found', async () => {
      const response = await request(app).get('/une-route-qui-n-existe-pas');
      assert.strictEqual(response.status, 404);
    });
  });

  // Test for a road who return a JSON
  describe('GET /', () => {
    it('should return JSON data with 200 statut ', async () => {
      const response = await request(app).get('/');
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.type, 'application/json');
      assert(response.body.length > 0);
      assert(response.body != null);
    });
  });

  // Test for a road with paramètres d'URL
  describe('GET /', () => {
    it('devrait retourner un utilisateur spécifique avec un statut 200', async () => {
      const response = await request(app).get(`/`);
      assert.strictEqual(response.status, 200);
      const userId = response.body.id; // Assurez-vous que cette ligne correspond à la structure de votre réponse
      assert.strictEqual(userId, 1);
    });
  });


  

});