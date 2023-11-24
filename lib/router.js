import { Router }   from 'express';
import controllers  from './controllers/index.js';
import middlewares  from './middlewares.js';

const router = Router();

router.get('/test', (req, res) => res.send('ok'));

/*router.post(   '/products/filter', timeout, controllers.products.filter );
router.post(   '/products/import/all',      controllers.products.createAll );
router.put(    '/products/:id',             controllers.products.update );
router.delete( '/products/:id',             controllers.products.delete );*/
router.post( '/products', controllers.products.create );

// router.post(   '/files', busboy, controllers.files.upload );
// router.delete( '/files/:id', controllers.files.delete );

export default router;
