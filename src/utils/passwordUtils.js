import bcrypt from 'bcrypt';
import logger from './logger.js';

export const authenticateUser = async (password, usuario) => {

    try {

        const auth = bcrypt.compare(password, usuario.password);

        return auth;

    } catch (error) {

        logger.error(error);

    }

};

export const encryptPassword = async (password) => {

    try {

        const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));

        return hashedPassword

    } catch (error) {

        logger.error(error);

    }

}
