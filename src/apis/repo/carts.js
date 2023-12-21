import logger from "../../utils/logger.js";
import CartSchema from "../../schemas/carts.js";
import { cartDTO } from "../DTOs/cartDTO.js";
import CartModel from "../../models/cart.js";

export default class CartsRepo {
    constructor(dao) {

        this.dao = dao

    }

    async createCart() {

        try {

            const cartDto = cartDTO(new CartSchema());
         
            const newCart = await this.dao
                .createCart(cartDto);

            return new CartModel(newCart).datos();

        } catch (err) {

            logger.error(err);

        }

    }

    async addProduct(cartId, productId) {

        try {

            const data = await this.dao
                .addProduct(cartId, productId);

            return data;

        } catch (err) {

            logger.error(err);

        }

    }

    async getAll() {

        try {

            const data = await this.dao
                .getAll();

            return data.map(c => new CartModel(c).datos());;

        } catch (err) {

            logger.error(err);

        }

    }

    async getCartById(id) {

        try {

            const data = await this.dao
                .getCartById(id);

            return new CartModel(data).datos();

        } catch (err) {

            logger.error(err);

        }

    }

    async deleteCartById(id) {

        try {

            const data = await this.dao
                .deleteCartById(id);

            return data;

        } catch (err) {

            logger.error(err);

        }

    }

    async deleteCartProductById(cartId, productId) {

        try {

            const data = await this.dao
                .deleteCartProductById(cartId, productId);

            return data;

        } catch (err) {

            logger.error(err);

        }

    }

}