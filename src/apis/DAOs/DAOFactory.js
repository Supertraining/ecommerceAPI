import ProductsDAO from './ProductsDAO.js';
import productModel from '../../db/schemas/product.js';
import UsersDAO from './usersDAO.js';
import userModel from '../../db/schemas/user.js';
import CartsDAO from './cartsDAO.js';
import cartSchema from '../../db/schemas/carts.js';
import { connect } from '../../db/mongoConnection.js';
import * as config from '../../config/config.js';
import logger from '../../log/logger.js';

switch (config.nodeEnv) {

    case 'development':
        connect(config.mongoLocalURL);
        logger.info('Base de datos MongDBLocal conectada');
        break;

    default:
        connect(config.mongoURL);
        logger.info('Base de datos MongDB Atlas conectada');
        break;

}

export default class DAOFactory {

    constructor(dao) {

        switch (dao) {
            case ('user'):
                return UsersDAO.getInstance(userModel);
            case ('product'):
                return ProductsDAO.getInstance(productModel);
            case ('cart'):
                return CartsDAO.getInstance(cartSchema, productModel);
            default:
                break;
        }
    }
}
