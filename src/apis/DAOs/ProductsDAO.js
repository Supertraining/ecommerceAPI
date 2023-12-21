import logger from '../../utils/logger.js';

let instance = null;

export default class ProductsDAO {

	constructor(model) {
		this.model = model
	}

	async save(obj) {

		try {

			const product = await this.model
				.insertMany(obj);

			return product;

		} catch (err) {

			logger.error(err);

		}

	}

	async getById(id) {

		try {

			const product = await this.model
				.findById(id);

			return product;

		} catch (err) {

			logger.error(err);

		}

	}

	async updateProduct(id, update) {

		try {

			const data = await this.model
				.updateOne({ _id: id }, { $set: update });

			return data;

		} catch (err) {

			logger.error(err);

		}

	}

	async getAll() {

		try {

			const products = await this.model
				.find();

			return products;

		} catch (err) {

			logger.error(err);
		}
	}

	async deleteById(id) {

		try {

			const data = await this.model
				.deleteOne({ _id: id });

			return data;

		} catch (err) {

			logger.error(err);

		}

	}

	static getInstance(model) {

		if (!instance) {

			instance = new ProductsDAO(model);

			logger.info('Se ha creado una instancia de ProductsDAO');

		}

		logger.info('Se ha utilizado una instancia ya creada de ProductsDAO');

		return instance;

	}

}






