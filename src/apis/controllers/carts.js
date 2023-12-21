import { routeLogger } from '../../utils/logger.js';

export default class CartsController {

	constructor(service) {

		this.cartServices =  service

	}

	createCart = async (req, res) => {

		try {

			const data = await this.cartServices
				.createCart();

			res.status(201).json(data);

		} catch (error) {

			routeLogger(req, 'error', error.name);

		}

	};

	addProduct = async (req, res) => {

		try {

			const data = await this.cartServices
				.addProduct(req.params.idCarrito, req.params.idProducto);
			data.data

				? res.status(200).json(data)
				: res.status(404).json(data);

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	};

	getAll = async (req, res) => {

		try {

			let data = await this.cartServices
				.getAll();

			res.json(data);

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	}

	getCartById = async (req, res) => {

		try {

			let data = await this.cartServices
				.getCartById(req.params.id);

			data

				? res.status(200).json(data)

				: res.status(404).json(data);


		} catch (error) {

			routeLogger(req, 'error', error);

		}

	}

	getCartProducts = async (req, res) => {

		try {

			const data = await this.cartServices
				.getCartById(req.params.id);

			data.data
				
				? res.status(200).json(data.productos)

				: res.status(404).json(data);

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	};

	deleteCartById = async (req, res) => {
		try {

			const data = await this.cartServices
				.deleteCartById(req.params.id);

			res.json(data);

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	};

	deleteCartProductById = async (req, res) => {

		try {

			const data = await this.cartServices
				.deleteCartProductById(req.params.idCarrito, req.params.id_prod);

			data.data
				? res.status(200).json(data)

				: res.status(404).json(data);

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	};

}


