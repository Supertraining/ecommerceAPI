import { productoDTO } from "../DTOs/productDTO.js";
import ProductModel from "../../models/product.js";
import logger from "../../utils/logger.js";

export default class ProductRepo {

    constructor(dao) {

        this.dao = dao

    }

    async save(obj) {

        try {

            const productDb = productoDTO(obj);

            const productDto = await this.dao
                .save(productDb);
            
            return productDto.map((p) => new ProductModel(p).datos());

        } catch (error) {

           throw(error)

        }

    }

    async getById(id) {

        try {

            const productDto = await this.dao
                .getById(id);
                
            return new ProductModel(productDto).datos();

        } catch (error) {

           throw(error)

        }

    }

    async updateProduct(id, update) {

        try {

            const data = await this.dao
                .updateProduct(id, update);

            return data;

        } catch (error) {

           throw(error)

        }

    }

    async getAll() {

        try {

            const products = await this
                .dao.getAll();

            return products.map((p) => new ProductModel(p).datos());

        } catch (error) {

           throw(error)

        }

    }

    async deleteById(id) {

        try {

            const data = await this.dao
                .deleteById(id);

            return data;

        } catch (error) {

           throw(error)

        }

    }

}