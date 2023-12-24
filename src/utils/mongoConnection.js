import mongoose from "mongoose";
import logger from './logger.js'

export const connect = (url) => {

    try {

        mongoose.connect(`${url}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        
    } catch (error) {

        logger.error(error);

    }

}