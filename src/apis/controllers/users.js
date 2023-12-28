import { adminNewOrderNotification, userOrderNotification } from '../../utils/notificationsUtils.js';
import logger from '../../log/logger.js';

export default class UsersController {

	constructor(userService, cartService) {

		this.userServices = userService;

		this.cartServices = cartService;

	}

	registerUser = async (req, res, next) => {
		try {

			const user = await this.userServices.registerUser(req.body);

			res.status(201).send(`User ${user.username} created successfully`)

		} catch (error) {

			next(error)

		}
	}

	login = async (req, res, next) => {
		try {

			const { username, password } = req.body;

			const loggedUser = await this.userServices.login(username, password);

			res.send(loggedUser);

		} catch (error) {

			next(error)

		}
	}

	getByUserName = async (req, res, next) => {

		try {

			const usuario = await this.userServices
				.getByUserName(req.user?.username);

			res.json({ message: `Usuario ${usuario.username} logueado` });

		} catch (error) {

			next(error);

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

			next(error)

		}

	};

	getMyCart = async (req, res, next) => {

		try {

			const userName = await req.user?.username;

			if (!userName) {
				res.status(404).json({ message: 'Por favor inicie sesión' });
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

			next(error)

		}

	}

	newOrderNotification = async (req, res, next) => {

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
					generateOrder[ product.nombre ]
						? generateOrder[ product.nombre ]++
						: generateOrder[ product.nombre ] = 1;
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

			next(error)

		}

	}


	logout = async (req, res, next) => {

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

			next(error)

		}

	}


	deleteById = async (req, res, next) => {

		try {

			const deletedUser = await this.userServices
				.deleteById(req.params.id);

			res.json(deletedUser)

		} catch (error) {

			next(error)

		}

	}

	getAllUsers = async (req, res, next) => {

		try {

			const users = await this.userServices
				.getAllUsers();
			users.length === 0
				? res.json(data).send('No hay usuarios registrados')
				: res.json(users);

		} catch (error) {

			next(error)

		}

	}

	getById = async (req, res, next) => {

		try {

			const user = await this.userServices
				.getById(req.params.id);

			res.status(200).json(user)

		} catch (error) {

			next(error);

		}

	}

	updateUser = async (req, res, next) => {

		try {

			const updatedUser = await this.userServices
				.updateUser(req.params.id, req.body);

			res.json(updatedUser);

		} catch (error) {

			next(error)

		}

	}

}
