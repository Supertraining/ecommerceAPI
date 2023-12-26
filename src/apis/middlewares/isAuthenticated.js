import createError from "../../utils/createErrorUtils.js";

export const requireAuthentication =  (req, res, next) => {

    try {
        
        if (!req.isAuthenticated()) {
            
             res.status(404).redirect('/api/user/login');

        } else {

             next();

        }

    } catch (error) {

        next(error)

    }

};