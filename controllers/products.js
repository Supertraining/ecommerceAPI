import ProductServices from '../services/products.js';
import logger, { routeLogger } from '../utils/logger.js';

export default class ProductsControllers {

	constructor() {

		this.services = new ProductServices();

	};

	save = async (req, res) => {

		try {

			const data = await this.services
				.save(req.body);
			data

				? res.status(201).json(data)

				: res.status(400).json(
					{
						message: 'Bad request'
					}
				);

		} catch (error) {

			routeLogger(req, error);

		}

	};

	updateProduct = async (req, res) => {

		try {

			const data = await this.services
				.updateProduct(req.params.id, req.body);
			data.data
				? res.status(200).json(data)
				: res.status(404).json(data.message)

		} catch (error) {

			routeLogger(req, error);

		}

	};

	getAll = async (req, res) => {

		try {

			let data = null;

			if (!req.params.id) {
				data = await this.services
					.getAll()
				res.json(data)

			} else {
				data = await this.services
					.getById(req.params.id);

				data
					? res.json(data)
					: res.status(404).json(data)
			}




		} catch (error) {

			routeLogger(req, error);

		}

	};

	getProductsByCategory = async (req, res) => {

		try {

			if (!req.params.categoria) {

				res.status(404).json({ message: 'Categoria no encontrada' })

			}

			const productsByCategory = await this.services.getProductsByCategory(req.params.categoria)

			res.json(productsByCategory)

		} catch (error) {

			routeLogger(req, 'error', error);

		}

	}

	deleteById = async (req, res) => {

		try {

			const data = await this.services
				.deleteById(req.params.id);
			data.data
				? res.status(204).json(data)
				: res.status(404).json(data)

		} catch (error) {

			routeLogger(req, error);

		}

	};

};