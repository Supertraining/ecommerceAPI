import createError from '../../utils/createErrorUtils.js'
export const authorize = (requiredRole) => {

    return async (req, res, next) => {
        try {

            const user = await req.user;
           
            if (user && user.role === requiredRole) {

                next()
            } else {
                let error = createError(403, `La ruta ${req.originalUrl}, metodo: ${req.method}, is forbidden`)
                throw error;
            }

        } catch (error) {

            next(error)

        }
    }

};