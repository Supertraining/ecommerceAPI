import express, { json, urlencoded } from 'express';
import session from 'express-session';
import passport from 'passport';
import fileUpload from 'express-fileupload';
import { routeLogger } from './src/utils/logger.js';
import userRouter from './src/dependencies/user.dependencies.js';
import productRouter from './src/dependencies/product.dependencies.js';
import cartRouter from './src/dependencies/cart.dependencies.js';
import * as config from './src/config/config.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swaggerSpecs.js';

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

app.use('/api/productos', productRouter.getRouter());
app.use('/api/carritos', cartRouter.getRouter());
app.use('/api/users',userRouter.getRouter());

app.all('/*', (req, res) => {
	const { url, method } = req
	routeLogger(req, 'warn')
	res.send(`La ruta ${method} ${url} no esta implementada`)
})

export default app

