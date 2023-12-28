import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authValidation.js';
import { authorize } from '../middlewares/roleValidation.js';


const router = Router();

export default class ProductsRouter {

    constructor(controller) {

        this.controllers = controller

    }

    getRouter() {

        router.get('/:id', this.controllers.getById);

        router.get('/', this.controllers.getAll);

        router.get('/categoria/:categoria', this.controllers.getProductsByCategory);

        router.use(isAuthenticated)
        router.use(authorize('admin'))

        router.post('/createProduct', this.controllers.save);

        router.put('/:id', this.controllers.updateProduct);

        router.delete('/:id', this.controllers.deleteById);


        return router;

    }

}





