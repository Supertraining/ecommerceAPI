import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authValidation.js';
import { authorize } from '../middlewares/roleValidation.js';

const router = Router();

export default class CartsRouter {

    constructor(controller) {

        this.controllers = controller

    }

    getRouter() {

        router.post('/', this.controllers.createCart);

        router.use(isAuthenticated)

        router.get('/:id/productos', this.controllers.getCartProducts);

        router.get('/:id', this.controllers.getCartById);

        router.post('/:idCarrito/productos/:idProducto/', this.controllers.addProduct);

        router.delete('/:idCarrito/productos/:id_prod', this.controllers.deleteCartProductById)

        router.use(authorize('admin'))

        router.get('/', this.controllers.getAll);

        router.delete('/:id', this.controllers.deleteCartById);

        return router;

    };


};

