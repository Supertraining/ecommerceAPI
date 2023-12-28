import createError from '../../utils/createErrorUtils.js';
import logger from '../../log/logger.js';

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

		} catch (error) {

			throw error;

		}

	}

	async addProduct(cartId, product) {

		try {

			const productAdded = await this.cartModel.updateOne(

				{ _id: cartId },

				{
					$push:
					{
						productos: product
					}
				}
			);

			return productAdded

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

			const data = await this.cartModel
				.find();

			return data;

		} catch (error) {

			throw error;

		};

	};

	async getCartById(id) {

		try {

			const cart = await this.cartModel
				.findById(id);

			if (!cart) {
				let error = createError(404, `Carrito con el ${id} no encontrado`);
				throw error;
			}

			return cart;

		} catch (error) {

			if (error.kind === 'ObjectId') {
				let error = createError(400, 'Id incorrecta')
				throw error
			}
			throw (error)

		}

	}

	async deleteCartById(id) {

		try {

			const cart = await this.cartModel
				.deleteOne({ _id: id });

			if (cart.deletedCount === 0) {

				let error = createError(404, `EL carrito con el Id: ${id} no encontrado`);
				throw error

			}

			return cart

		} catch (error) {

			if (error.kind === 'ObjectId') {
				let error = createError(400, 'Id incorrecta')
				throw error
			}
			throw (error)

		};

	};

	async deleteCartProductById(cartId, product) {

		try {

			const data = await this.cartModel.updateOne({ _id: cartId }, {
				$pull: {
					productos: product
				}
			});

			return data

		} catch (error) {

			if (error.kind === 'ObjectId') {
				let error = createError(400, 'Id incorrecta')
				throw error
			}
			throw (error)

		};

	};

	static getInstance(cartModel, productModel) {

		if (!instance) {

			instance = new CartsDAO(cartModel, productModel);

			logger.info('Se ha creado una instancia de CartsDAO');

		} else {
			logger.info('Se ha utilizado una instancia ya creada de CartsDAO');
		}

		return instance

	};

}

