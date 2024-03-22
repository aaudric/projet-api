/**
 * Express router for handling root path requests.
 *
 * @swagger
 * /:
 *   get:
 *     summary: Handle GET request on root path
 *     description: Returns a "Hello World!" message.
 *     responses:
 *       200:
 *         description: Successful response with the message.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello World!
 */
import { Router } from 'express';

// Create a new router instance
const router = Router();
// Handle GET request on root path
router.get('/', (req, res) => {
  req.log.info('/ request recieved');

  res.send('Hello World!');
});

export default router;
