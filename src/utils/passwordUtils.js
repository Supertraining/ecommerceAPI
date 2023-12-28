import bcrypt from 'bcrypt';
import logger from '../log/logger.js';

export const authenticatePassword = async (password, user) => {

    try {

        const auth = bcrypt.compare(password, user.password);

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
