import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  req.log.info('/ request recieved');

  res.send('Hello World!');
});

export default router;
