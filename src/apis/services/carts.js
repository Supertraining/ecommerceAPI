import createError from '../../utils/createErrorUtils.js'
export default class CartsServices {

    constructor(repo, productService) {

        this.repo = repo
        this.productService = productService
    }

    async createCart() {

        try {

            const newCart = await this.repo
                .createCart();

            return newCart;

        } catch (error) {

            throw error

        }

    }

    async addProduct(cartId, productId) {

        try {

            const product = await this.productService.getById(productId);

            const productAdded = await this.repo
                .addProduct(cartId, product);

            if (productAdded) {

                const cartWithProduct = await this.repo
                    .getCartById(cartId);

                return cartWithProduct
            }


        } catch (error) {

            throw error

        }

    }

    async getAll() {

        try {

            const carts = await this.repo
                .getAll();

            return carts;

        } catch (error) {

            throw error

        }

    }

    async getCartById(id) {

        try {

            const cart = await this.repo
                .getCartById(id);

            return cart;

        } catch (error) {

            throw error

        }

    }

    getCartProducts = async (id) => {

		try {

			const cart = await this.repo
				.getCartById(id);

			return cart.productos

		} catch (error) {

			throw(error)

		}

	};


    async deleteCartById(id) {

        try {

            const data = await this.repo
                .deleteCartById(id);

            data

        } catch (error) {

            throw error

        }

    }

    async deleteCartProductById(cartId, productId) {

        try {

            const cart = await this.repo.getCartById(cartId);
            
            const isProductInCart = await cart.productos.some(p => p._id === productId);
         
            if (!isProductInCart) {

                let error = createError(404, `El producto con el Id: ${productId},  no fue encontrado en el carrito con el id: ${cartId}`);
                throw error;
            }

            const product = await this.productService.getById(productId);

            const data = await this.repo
                .deleteCartProductById(cartId, product);

            if (!data) {

                return {
                    data: data,
                    message: `El producto ${productId} no ha podido ser eliminado del carrito ${cartId}`
                }
            }

            const updatedCart = await this.repo
                .getCartById(cartId);

            return updatedCart

        } catch (error) {

            throw error

        }

    }

}