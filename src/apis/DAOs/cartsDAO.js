import logger from '../../utils/logger.js';

let instance = null;

export default class CartsDAO {

	constructor(cartModel, productModel) {
		this.cartModel = cartModel
		this.productModel = productModel
	}

	async createCart(cart) {

		try {
			const newCart = await this.cartModel.create(cart);

			return newCart

		} catch (err) {

			logger.error(err);

		}

	}

	async addProduct(cartId, productId) {

		try {

			const product = await this.productModel
				.findById(productId);

			const data = await this.cartModel.updateOne(

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

			const data = await this.cartModel
				.find();

			return data;

		} catch (err) {

			logger.error(err);

		};

	};

	async getCartById(id) {

		try {

			const data = await this.cartModel
				.findById(id);

			return data;

		} catch (err) {

			logger.error(err);

		}

	}

	async deleteCartById(id) {

		try {

			const data = await this.cartModel
				.deleteOne({ _id: id });

			return data

		} catch (err) {

			logger.error(err);

		};

	};

	async deleteCartProductById(cartId, productId) {

		try {

			const product = await this.productModel
				.findById(productId);

			const data = await this.cartModel.updateOne({ _id: cartId }, {
				$pull: {
					productos: product
				}
			});

			return data

		} catch (err) {

			logger.error(err);

		};

	};

	static getInstance(cartModel, productModel) {

		if (!instance) {

			instance = new CartsDAO(cartModel, productModel);

			logger.info('Se ha creado una instancia de CartsDAO');

		};

		logger.info('Se ha utilizado una instancia ya creada de CartsDAO');

		return instance

	};

}

