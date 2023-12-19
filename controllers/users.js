import CartsServices from '../services/carts.js';
import { adminNewOrderNotification, userOrderNotification } from '../utils/notifications.js';
import logger, { routeLogger } from '../utils/logger.js';

export default class UsersController {

	constructor(service) {

		this.userServices = service;

		this.cartServices = new CartsServices();

	}


	getByUserName = async (req, res) => {

		try {

			const usuario = await this.userServices
				.getByUserName(req.user?.username);

			res.json({ message: `Usuario ${usuario.username} logueado` })

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	}

	getUserImage = async (req, res, next) => {

		try {
	
			!req.user?.username 
			
			? res.status(404).json({ message: 'Por favor inicie sesión' })

			: await res.json(

				{
					imagen: `../public/images/${req.user.username}.jpg`
				}

			);

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	};

	getMyCart = async (req, res) => {

		try {

			const userName = await req.user?.username;

			if (!userName) {
				res.status(404).json({message : 'Por favor inicie sesión'});
			}

			const carrito = await this.cartServices
				.getCartById(req.user.cartId);
			const compra = Boolean;

			res.json(

				{
					carrito: carrito,
					user: userName,
					compra: compra
				}

			);

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	}

	newOrderNotification = async (req, res) => {
		
		try {
			
			const user = await this.userServices
				.getByUserName(req.user.username);
			
			const carrito = await this.cartServices
				.getCartById(user.cartId);

			const products = carrito.productos;

			if (products.length === 0) {

				res.status(404).json({ message: 'Carrito vacío' })
				return
			}

			let generateOrder = {};

			products
				.forEach(product => {
					generateOrder[product.nombre]
						? generateOrder[product.nombre]++
						: generateOrder[product.nombre] = 1;
				});

			const newOrder = JSON.stringify(generateOrder);

			let compra = Boolean;

			adminNewOrderNotification(user, newOrder);

			newOrder
				? compra = true
				: compra = false;
				
			userOrderNotification(user.telefono)

			res.json(

				{
					carrito: carrito,
					user: user.username,
					compra: compra
				}

			);

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	}

	failRegister = async (req, res) => {
		try {

			res.status(404).json({ message: 'Error de registro' });

		} catch (error) {

			routeLogger(req, 'error', error);

		}
	}

	logout = async (req, res) => {

		try {

			res.json({ message: `Hasta luego ${req.user.username}` });


			setTimeout(() => {

				req.logout((error) => {

					if (error) {

						logger.error('Error en cierre de sesión');

					} else {

						logger.info('session eliminada con éxito');

					}

				});
			}, 2000);

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	}

	failLogin = async (req, res) => {

		try {

			res.status(404).json({ message: 'Error en el login' });

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	}

	failInsertUser = async (req, res) => {

		try {

			res.status(400).json({ message: 'Error en el registro de usuario' });

		} catch (error) {

			routeLogger(req, 'error', error);

		}
	}

	deleteById = async (req, res) => {

		try {

			const deletedUser = await this.userServices
				.deleteById(req.params.id);

			deletedUser.data

				? res.status(200).json(deletedUser)

				: res.status(404).json(deletedUser);

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	}

	getAllUsers = async (req, res) => {

		try {

			const users = await this.userServices
				.getAllUsers();
		
			res.json(users);

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	}

	getById = async (req, res) => {

		try {

			const user = await this.userServices
				.getById(req.params.id);

			user.data

				? res.status(200).json(user)

				: res.status(404).json(user);


		} catch (error) {

			routeLogger(req, 'error', error);;

		}

	}

	updateUser = async (req, res) => {

		try {

			const updatedUser = await this.userServices
				.updateUser(req.params.id, req.body);
			updatedUser.data

				? res.json(updatedUser)

				: res.status(404).json(updatedUser.message);

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	}

}
