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

        } catch (error) {

           throw(error)

        }

    }

    async addProduct(cartId, product) {

        try {

            const productAdded = await this.dao
                .addProduct(cartId, product);

            return productAdded;

        } catch (error) {

           throw(error)

        }

    }

    async getAll() {

        try {

            const data = await this.dao
                .getAll();

            return data.map(c => new CartModel(c).datos());;

        } catch (error) {

           throw(error)

        }

    }

    async getCartById(id) {

        try {

            const cart = await this.dao
                .getCartById(id);

            return new CartModel(cart).datos();

        } catch (error) {

            throw error;

        }

    }

    async deleteCartById(id) {

        try {

            const cart = await this.dao
                .deleteCartById(id);

            return cart;

        } catch (error) {

           throw(error)

        }

    }

    async deleteCartProductById(cartId, productId) {

        try {

            const data = await this.dao
                .deleteCartProductById(cartId, product);

            return data;

        } catch (error) {

           throw(error)

        }

    }

}