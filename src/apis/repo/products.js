import { productoDTO } from "../DTOs/productDTO.js";

export default class ProductRepo {

    constructor(dao) {

        this.dao = dao

    }

    async save(obj) {

        try {

            const productDb = productoDTO(obj);

            const productDto = await this.dao
                .save(productDb);
            
            return productDto;

        } catch (error) {

           throw(error)

        }

    }

    async getById(id) {

        try {

            const productDto = await this.dao
                .getById(id);
                
            return productDto;

        } catch (error) {

           throw(error)

        }

    }

    async updateProduct(id, update) {

        try {

            const updatedProduct = await this.dao
                .updateProduct(id, update);

            return updatedProduct;

        } catch (error) {

           throw(error)

        }

    }

    async getAll() {

        try {

            const products = await this
                .dao.getAll();

            return products

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