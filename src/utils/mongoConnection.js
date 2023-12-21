import mongoose from "mongoose";
import logger from './logger.js'

export const connect = async (url) => {

    try {

        await mongoose.connect(`${url}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        
    } catch (error) {

        logger.error(error);

    }

}