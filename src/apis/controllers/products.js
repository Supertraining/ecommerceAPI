export default class ProductsControllers {

	constructor(service) {

		this.services = service

	};

	save = async (req, res, next) => {

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

			next(error)

		}

	};

	updateProduct = async (req, res, next) => {

		try {

			const updatedProduct = await this.services
				.updateProduct(req.params.id, req.body);

			res.json(updatedProduct)

		} catch (error) {

			next(error)

		}

	};

	getAll = async (req, res, next) => {

		try {

			const allProducts = await this.services
				.getAll()
			allProducts.length === 0
				? res.status(204).json(allProducts)
				: res.json(allProducts)

		} catch (error) {

			next(error)

		}

	};

	getById = async (req, res, next) => {

		try {

			const product = await this.services
				.getById(req.params.id);

			res.json(product)

		} catch (error) {

			next(error)

		}

	};

	getProductsByCategory = async (req, res, next) => {

		try {

			const productsByCategory = await this.services.getProductsByCategory(req.params.categoria)

			res.json(productsByCategory)

		} catch (error) {

			next(error)

		}

	}

	deleteById = async (req, res, next) => {

		try {

			const productId = req.params.id

			const productDeleted = await this.services
				.deleteById(productId);

			res.status(204).send(`Product with id: ${productId} succesfully deleted`)

		} catch (error) {

			next(error)

		}

	};

};