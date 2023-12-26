import express from 'express';
import passport from 'passport';
import { passportRegister, passportLogin } from '../middlewares/passport.js';
import { routeLogger } from '../../utils/logger.js';
import { savePicturesLocal } from '../middlewares/storeUserImage.js';
import { requireAuthentication } from '../middlewares/isAuthenticated.js';


const router = express.Router();

export default class UserRouter {

	constructor(controller) {

		this.controllers = controller

	}

	getRouter() {

		router.post(

			'/register',

			passportRegister,

			savePicturesLocal,

			passport.authenticate('register',

				{
					failureRedirect: '/api/user/failregister',
					successRedirect: '/api/user/inicio'
				}

			)

		);

		router.get(

			'/failregister',

			this.controllers.failRegister

		);

		router.get(

			'/login',

			async (req, res) => {

				try {
					
					req.isAuthenticated()
						
					? res.json(`El usuario ${req.user.username} ya está logueado`)
					: res.status(404).json({message: 'Por favor inicie sesión'});

				} catch (error) {

					routeLogger(req, 'error', error);

				}


			}

		);
	
		router.post(

			'/login',

			passportLogin,

			passport
				.authenticate('login',
					{
						failureRedirect: '/api/user/faillogin',
						successRedirect: '/api/user/inicio'
					}
				)

		);

		router.get('/faillogin', (req, res) => {

				res.status(404).send('Error en el login')

		});

		router.get(

			'/inicio',

			requireAuthentication,

			this.controllers
				.getByUserName

		);

		router.get(

			'/logout',

			this.controllers
				.logout

		);
	

		router.get(

			'/getAll',

			this.controllers
				.getAllUsers

		);

		router.get(

			'/user/:id',

			this.controllers
				.getById

		)

		router.delete(

			'/eliminar/:id',

			this.controllers
				.deleteById

		);

		router.put(

			'/actualizar/:id',

			this.controllers
				.updateUser

		);
			
		router.get(

			'/imagen',

			this.controllers
				.getUserImage

		);
		
		router.get(

			'/miCarrito',

			this.controllers
				.getMyCart

		);
		
		router.post(

			'/miCarrito',

			this.controllers
				.newOrderNotification

		);

		return router;
	}
}





