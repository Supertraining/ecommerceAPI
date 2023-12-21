import ProductsRepo from '../repo/products.js';
import logger from '../../utils/logger.js';

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

            logger.error(error);

        }

    }

    async getById(id) {

        try {

            const product = await this.repo
                .getById(id);

            if (!product) {

                return {
                    message: `El producto con el Id: ${id} no encontrado`,
                    data: product
                };

            }

            return {
                data: product
            } 

        } catch (error) {

            logger.error(error);

        }

    }

    async getProductsByCategory(category) {

		try {

			const data = await this.repo
				.getAll()
	
			const productsByCategory = data
				.filter(product => product.categoria === category)
		
			
            return productsByCategory
			

		} catch (error) {

			logger.error(error);

		}

    }
    
    async updateProduct(id, update) {

        try {

            const data = await this.repo
                .updateProduct(id, update);

            if (data.matchedCount === 0) {

                logger.info(`El producto con el Id: ${id} no encontrado`);

                return {
                    data: null,
                    message: `El producto con el Id: ${id} no encontrado`,
                };

            }

            if (data.modifiedCount === 0) {

                return {
                    data: null,
                    message: `El producto no ha sido actualizado, la información provista es igual a la que el producto ya posee`,
                };

            }

            const updatedProduct = await this.repo
                .getById(id);
           
            return {
                message: 'producto actualizado con exito',
                data: updatedProduct
            };

        } catch (error) {

            logger.error(error);

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

            logger.error(error);

        }

    }

    async deleteById(id) {

        try {

            const data = await this.repo
                .deleteById(id);

            if (data.deletedCount === 0) {

                logger.info(`El producto con el Id: ${id} no existe`);

                return {
                    message: `El producto con el Id: ${id} no existe`,
                    data: null
                }
            }

            const deletedProduct = await this.repo
                .getById(id);

            logger.info('producto eliminado con exito');

            return {
                message: `producto ${id} eliminado con exito`,
                deletedProduct: deletedProduct
            };

        } catch (error) {

            logger.error(error);

        }

    }

}