import logger from "../../utils/logger.js";

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

        } catch (err) {

            logger.error(err);

        }

    }

    async addProduct(cartId, productId) {

        try {

            const cart = await this.repo.getCartById(cartId);

            if (!cart) {

                logger.info(`El Carrito con el Id: ${cartId}, no existe`);

                return {
                    data: null,
                    message: `El Carrito con el Id: ${cartId}, no existe`
                };

            }

            const product = await  this.productService.getById(productId);

            if (!product) {

                logger.info(`El producto con el Id: ${productId},  no existe`);

                return {
                    data: null,
                    message: `El producto con el Id ${productId}, no existe`
                }
            }


            const data = await this.repo
                .addProduct(cartId, productId);

            if (!data) {

                logger.info(`El producto ${productId} no se ha podido añadir al carrito ${cartId}`);

                return {
                    data: null,
                    message: `El producto ${productId} no ha podido ser añadido al carrito ${cartId}`
                }
            }

            const updatedCart = await this.repo
                .getCartById(cartId);

            logger.info(`El producto ${productId} se ha añadido correctamente al carrito ${cartId}`);

            return {
                data: updatedCart,
                message: `El producto ${productId} se ha añadido correctamente al carrito ${cartId}`
            }

        } catch (err) {

            logger.error(err);

        }

    }

    async getAll() {

        try {

            const data = await this.repo
                .getAll();

            if (data.length > 0) {

                return data;

            } else {

                return {
                    data: data,
                    message: 'No hay carritos'

                }

            }

        } catch (err) {

            logger.error(err);

        }

    }

    async getCartById(id) {

        try {

            const data = await this.repo
                .getCartById(id);

            if (!data) {

                return {

                    data: null,
                    message: `El carrito con el Id: ${id}, no existe`

                }

            }

            return data;

        } catch (err) {

            logger.error(err);

        }

    }

    async deleteCartById(id) {

        try {

            const data = await this.repo
                .deleteCartById(id);

            if (data.deletedCount === 0) {

                return {

                    data: null,
                    message: `El carrito con el Id ${id}, no existe`

                }

            }

            return {
                message: `El carrito con el Id ${id}, ha sido eliminado`,
            }

        } catch (err) {

            logger.error(err);

        }

    }

    async deleteCartProductById(cartId, productId) {

        try {

            const cart = await this.repo.getCartById(cartId);

            if (!cart) {

                logger.info(`El Carrito con el Id: ${cartId}, no existe`);

                return {
                    cart: null,
                    message: `El Carrito con el Id: ${cartId}, no existe`
                };

            }

            const product = await cart.productos.some(p => p._id.toString() === productId);

            if (!product) {

                logger.info(`El producto con el Id: ${productId},  no existe`);

                return {
                    product: null,
                    message: `El producto con el Id ${productId}, no existe`
                }
            }

            const data = await this.repo
                .deleteCartProductById(cartId, productId);

            if (!data) {

                return {
                    data: data,
                    message: `El producto ${productId} no ha podido ser eliminado del carrito ${cartId}`
                }
            }

            const updatedCart = await this.repo
                .getCartById(cartId);

            return {
                data: updatedCart,
                message: `El producto ${productId} se ha eliminado correctamente del carrito ${cartId}`
            }

        } catch (err) {

            logger.error(err);

        }

    }

}