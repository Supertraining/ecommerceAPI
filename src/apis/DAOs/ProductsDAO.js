import createError from '../../utils/createErrorUtils.js';
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

		} catch (error) {

			throw (error)

		}

	}

	async getById(id) {

		try {

			const product = await this.model
				.findById(id);

			if (!product) {
				let error = createError(404, `Producto con el id: ${id} no encontrado`);
				throw error;
			}

			return product;

		} catch (error) {

			if (error.kind === 'ObjectId') {
				let error = createError(400, 'Id incorrecta')
				throw error
			}
			throw (error)

		}

	}

	async updateProduct(id, update) {

		try {

			const data = await this.model
				.updateOne({ _id: id }, { $set: update });

			return data;

		} catch (error) {

			throw (error)

		}

	}

	async getAll() {

		try {

			const products = await this.model
				.find();

			return products;

		} catch (error) {

			throw (error)
		}
	}

	async deleteById(id) {

		try {

			const data = await this.model
				.deleteOne({ _id: id });

			return data;

		} catch (error) {

			throw (error)

		}

	}

	static getInstance(model) {

		if (!instance) {

			instance = new ProductsDAO(model);

			logger.info('Se ha creado una instancia de ProductsDAO');

		} else {
			logger.info('Se ha utilizado una instancia ya creada de ProductsDAO');
		}



		return instance;

	}

}






