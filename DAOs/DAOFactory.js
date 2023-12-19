import ProductsDAO from './ProductsDAO.js';
import UsersDAO from './usersDAO.js';
import { usermodel } from '../schemas/user.js';
import CartsDAO from './cartsDAO.js';
import { connect } from '../utils/mongoConnection.js';
import * as config from '../config/config.js';
import logger from '../utils/logger.js';

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
                return UsersDAO.getInstance(usermodel);
            case ('product'):
                return ProductsDAO.getInstance();
            case ('cart'):
                return CartsDAO.getInstance();
            default:
                break;
        }
    }
}
