import logger, { handleLog } from "../../../utils/logger.js";
const errorHandler = (err, req, res, next) => {
  try {
    console.log('ENTRO AL ERROR HANDLER')
    const errorStatus = err.status || 500;
    const errorMessage = !err.status ? 'Internal server Error' : err.message;

    const additionalInfo = {
      route: req.originalUrl,
      method: req.method,
      ip: req.ip,
      user_agent: req.headers[ 'user-agent' ],
      user: req.user
    };
    
    handleLog(err, additionalInfo)

    return res.status(errorStatus).send(errorMessage)
    
  } catch (error) {
    logger.error
  }
}

export default errorHandler;