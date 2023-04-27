import { Router } from 'express';
import CartsController from '../controllers/carts.js';

const router = Router();

export default class CartsRouter {

    constructor() {

        this.controllers = new CartsController()

    }

    start() {

        router.get(

            '/',

            this.controllers
                .getAll

        );

        router.get(

            '/:id/productos',

            this.controllers
                .getCartProducts
        );

        router.get(
            '/:id',

            this.controllers
                .getCartById
        );

        router.post(

            '/',

            this.controllers
                .createCart
        );

        router.post(

            '/:idCarrito/productos/:idProducto/',

            this.controllers
                .addProduct
        );

        router.delete(

            '/:id',

            this.controllers
                .deleteCartById
        );

        router.delete(

            '/:idCarrito/productos/:id_prod',

            this.controllers
                .deleteCartProductById
        );

        return router;

    };


};

