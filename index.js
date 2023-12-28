import app from "./src/app.js";
import logger  from './src/log/logger.js';


const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => {
	logger.info(`Server on at ${PORT} - PID: ${process.pid}`);
})
.on('error', (error) => {
	logger.error(error);
})
