import express, { json, urlencoded } from 'express';
import session from 'express-session';
import ProductsRouter from './router/products.js';
import passport from 'passport';
import fileUpload from 'express-fileupload';
import logger, { routeLogger } from './utils/logger.js';
import UserRouter from './router/users.js';
import CartsRouter from './router/carts.js';
import * as config from './config/config.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerSpecs.js';

const app = express();

app.use(
	session(config.sessionConfig)
);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());
app.use('/public/images/', express.static('./public/images'));
app.use('/public/icons', express.static('./public/icons'));
app.use('/public/js', express.static('./public/js'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const productsRouter = new ProductsRouter();
const userRouter = new UserRouter();
const cartsRouter = new CartsRouter();

app.use('/api/productos', productsRouter.start());
app.use('/api/carritos', cartsRouter.start());
app.use(userRouter.start());
app.all('/*', (req, res) => {
	const { url, method } = req
	routeLogger(req, 'warn')
	res.send(`La ruta ${method} ${url} no esta implementada`)
})

const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => {
	logger.info(`Server on at ${PORT} - PID: ${process.pid}`);
})
.on('error', (error) => {
	logger.error(error);
})
