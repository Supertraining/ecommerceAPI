import createError from "../../utils/createErrorUtils.js";
import { verifyToken } from "../../utils/tokenUtils.js"

export const isAuthenticated = (req, res, next) => {

  try {

    const signedToken = req.header('Authorization');

    if (!signedToken) {
      let error = createError(401, 'Unauthorized');
      throw(error);
    }

    verifyToken(signedToken, (err, payload) => {
      
      if (err) {
        let error = createError(403, 'Forbiden');
        throw(error);
      }

      req.user = payload;
      next();

    })

  } catch (error) {
    next(error)
  }

}