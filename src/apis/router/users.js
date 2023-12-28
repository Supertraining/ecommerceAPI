import express from 'express';
import { savePicturesLocal } from '../middlewares/storeUserImage.js';
import { isAuthenticated } from '../middlewares/authValidation.js';
import { authorize } from '../middlewares/roleValidation.js';


const router = express.Router();

export default class UserRouter {

	constructor(controller) {

		this.controllers = controller

	}

	getRouter() {

		router.post(

			'/register',

			this.controllers.registerUser,

			savePicturesLocal,


		);

		router.post(

			'/login',

			this.controllers.login

		);

		router.use(isAuthenticated)
		
		router.get('/user/:id', this.controllers.getById);
		
		router.get('/imagen', this.controllers.getUserImage);
		
		router.get('/miCarrito', this.controllers.getMyCart);
		
		router.post('/miCarrito', this.controllers.newOrderNotification);
		
		router.use(authorize('admin'))
		
		router.get('/getAll', this.controllers.getAllUsers);

		router.delete('/eliminar/:id', this.controllers.deleteById);

		router.put('/actualizar/:id', this.controllers.updateUser);

		return router;
	}
}





