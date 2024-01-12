import { Router }   from 'express';
import controllers  from './controllers/index.js';

const router = Router();

router.get('/test', (req, res) => res.send('ok'));

router.post( '/products', controllers.products.create );
router.post( '/products/update', controllers.products.update );

export default router;
