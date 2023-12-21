import { Router } from 'express';
import { isAdmin } from './middlewares/isAdmin.js';

const router = Router();

export default class ProductsRouter {

    constructor(controller) {

        this.controllers = controller

    }

    getRouter() {

        router.get(

            '/:id?',

            this.controllers
                .getAll

        );

        router.get(

			'/categoria/:categoria?',

			this.controllers
				.getProductsByCategory

		);
        
        router.post(

            '/createProduct',

            isAdmin,

            this.controllers
                .save

        );

        router.put(

            '/:id',

            isAdmin,

            this.controllers
                .updateProduct

        );

        router.delete(

            '/:id',

            isAdmin,

            this.controllers
                .deleteById

        );

        return router;

    }

}





