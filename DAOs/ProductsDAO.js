import Productmodel from '../schemas/product.js';
import logger from '../utils/logger.js';
import { productoDTO } from '../DTOs/productDTO.js';

let instance = null;

export default class ProductsDAO {

	async save(obj) {

		try {

			const product = await Productmodel
				.insertMany(obj);

			return product;

		} catch (err) {

			logger.error(err);

		}

	}

	async getById(id) {

		try {

			const product = await Productmodel
				.findById(id);

			return product;

		} catch (err) {

			logger.error(err);

		}

	}

	async updateProduct(id, update) {

		try {

			const data = await Productmodel
				.updateOne({ _id: id }, { $set: update });

			return data;

		} catch (err) {

			logger.error(err);

		}

	}

	async getAll() {

		try {

			const products = await Productmodel
				.find();

			return products;

		} catch (err) {

			logger.error(err);
		}
	}

	async deleteById(id) {

		try {

			const data = await Productmodel
				.deleteOne({ _id: id });
		
			return data;

		} catch (err) {

			logger.error(err);

		}

	}

	static async getInstance() {

		if (!instance) {

			instance = new ProductsDAO();

			logger.info('Se ha creado una instancia de ProductsDAO');

		}

		logger.info('Se ha utilizado una instancia ya creada de ProductsDAO');

		return await instance;

	}

}






