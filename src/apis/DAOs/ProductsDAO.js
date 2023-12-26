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

			const updatedProduct = await this.model
				.updateOne({ _id: id }, { $set: update });

			if (updatedUser.matchedCount === 0) {

				let error = createError(404, `El producto con el Id: ${id} no encontrado`);

				throw error

			}
			if (updatedUser.modifiedCount === 0 && updatedUser.matchedCount === 1) {

				let error = createError(400, `El producto con el Id: ${id} no ha sido modificado`);

				throw error

			}

			return updatedProduct;

		} catch (error) {

			if (error.kind === 'ObjectId') {
				let error = createError(400, 'Id incorrecta')
				throw error
			}
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

			const productDeleted = await this.model
				.deleteOne({ _id: id });

			if (productDeleted.deletedCount === 0) {
		
				let error = createError(404, `Producto con el Id: ${id} no encontrado`);
				throw error

			}

			return productDeleted;

		} catch (error) {

			if (error.kind === 'ObjectId') {
				let error = createError(400, 'Id incorrecta')
				throw error
			}
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






