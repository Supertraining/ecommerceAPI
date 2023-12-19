import express, { json, urlencoded } from 'express';
import session from 'express-session';
import passport from 'passport';
import fileUpload from 'express-fileupload';
import { routeLogger } from './utils/logger.js';
import { userRouter } from './dependencies.js';
import CartsRouter from './router/carts.js';
import ProductsRouter from './router/products.js';
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
const cartsRouter = new CartsRouter();

app.use('/api/productos', productsRouter.start());
app.use('/api/carritos', cartsRouter.start());
app.use(userRouter.getRouter());

app.all('/*', (req, res) => {
	const { url, method } = req
	routeLogger(req, 'warn')
	res.send(`La ruta ${method} ${url} no esta implementada`)
})

export default app

