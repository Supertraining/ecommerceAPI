import CartSchema from '../schemas/carts.js';
import Productmodel from '../schemas/product.js';
import logger from '../utils/logger.js';

let instance = null;

export default class CartsDAO {

	async createCart(cart) {

		try {

			const newCart = await CartSchema.create(cart);
			
			return newCart

		} catch (err) {

			logger.error(err);

		}

	}

	async addProduct(cartId, productId) {

		try {

			const product = await Productmodel
				.findById(productId);

			const data = await CartSchema.updateOne(

				{ _id: cartId },

				{
					$push:
					{
						productos: product
					}
				}
			);

			return data

		} catch (err) {

			logger.error(err);

		}

	}

	async getAll() {

		try {

			const data = await CartSchema
				.find();

			return data;

		} catch (err) {

			logger.error(err);

		};

	};

	async getCartById(id) {

		try {

			const data = await CartSchema
				.findById(id);

			return data;

		} catch (err) {

			logger.error(err);

		}

	}

	async deleteCartById(id) {

		try {

			const data = await CartSchema
				.deleteOne({ _id: id });

			return data

		} catch (err) {

			logger.error(err);

		};

	};

	async deleteCartProductById(cartId, productId) {

		try {

			const product = await Productmodel
				.findById(productId);

			const data = await CartSchema.updateOne({ _id: cartId }, {
				$pull: {
					productos: product
				}
			});

			return data

		} catch (err) {

			logger.error(err);

		};

	};

	static async getInstance() {

		if (!instance) {

			instance = new CartsDAO();

			logger.info('Se ha creado una instancia de CartsDAO');

		};

		logger.info('Se ha utilizado una instancia ya creada de CartsDAO');

		return await instance

	};

}

