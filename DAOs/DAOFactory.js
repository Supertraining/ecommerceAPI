import ProductsDAO from './ProductsDAO.js';
import UsersDAO from './usersDAO.js';
import CartsDAO from './cartsDAO.js';
import { connect } from '../utils/mongoConnection.js';
import * as config from '../config/config.js';
import logger from '../utils/logger.js';

let dao = {
    prodDAO: await ProductsDAO.getInstance(),
    userDAO: await UsersDAO.getInstance(),
    cartDAO: await CartsDAO.getInstance()
} 

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

    static getDao() {

        return dao

    }
}
