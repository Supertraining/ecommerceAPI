import mongoose from "mongoose";

export const connect = (url) => {

    try {

        mongoose.connect(`${url}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        
    } catch (error) {

        throw error

    }

}