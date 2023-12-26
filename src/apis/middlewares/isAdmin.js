import createError from '../../utils/createErrorUtils.js'
export const isAdmin = async (req, res, next) => {
    try {

        const admin = await req.user?.admin;

        if (!admin) {
            let error = createError(401, `La ruta ${req.originalUrl}, metodo: ${req.method}, no autorizada`)
            throw error;
        }    

            next();
        
    } catch (error) {

        next(error)

    }

};