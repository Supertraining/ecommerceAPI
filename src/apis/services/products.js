import ProductsRepo from '../repo/products.js';
import logger from '../../utils/logger.js';
import createError from '../../utils/createErrorUtils.js';

export default class ProductServices {

    constructor(repo) {

        this.repo = repo

    }

    async save(obj) {

        try {

            const product = await this.repo
                .save(obj);

            return product

        } catch (error) {

            throw (error)

        }

    }

    async getById(id) {

        try {

            const product = await this.repo
                .getById(id);

            return product

        } catch (error) {

            throw (error)

        }

    }

    async getProductsByCategory(category) {

        try {

            const data = await this.repo
                .getAll()

            const categoryExists = data.some(e => e.categoria === category)
            if (!categoryExists) {
                let error = createError(404, 'Categoría no existente');
                throw error;
            }
            const productsByCategory = data
                .filter(product => product.categoria === category)
            console.log(productsByCategory)

            return productsByCategory

        } catch (error) {

            throw (error)

        }

    }

    async updateProduct(id, update) {

        try {

            const isProductUpdated = await this.repo
                .updateProduct(id, update);

            if (isProductUpdated) {
                const updatedProduct = await this.repo
                    .getById(id);

                return updatedProduct
            }

        } catch (error) {

            throw (error)

        }

    }

    async getAll() {

        try {

            const products = await this.repo
                .getAll();

            if (products.length === 0) {

                logger.info('No hay productos registrados');

                return {
                    message: 'No hay productos registrados',
                    data: products
                };
            }

            return {
                data: products
            };

        } catch (error) {

            throw (error)

        }

    }

    async deleteById(id) {

        try {

            const productDeleted = await this.repo
                .deleteById(id);

                return productDeleted

        } catch (error) {

            throw (error)

        }

    }

}