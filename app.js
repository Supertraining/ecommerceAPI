import express, { json, urlencoded } from 'express';
import session from 'express-session';
import passport from 'passport';
import fileUpload from 'express-fileupload';
import { routeLogger } from './src/utils/logger.js';
import * as config from './src/config/config.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swaggerSpecs.js';
import router from './src/dependencies/index.js'
import cors from 'cors'
import helmet from 'helmet';
import {rateLimit} from 'express-rate-limit';

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false,
})

app.use(cors())
app.use(limiter)
app.use(helmet())

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

app.use('/api/', router)

app.all('/*', (req, res) => {
	const { url, method } = req
	routeLogger(req, 'warn')
	res.send(`La ruta ${method} ${url} no esta implementada`)
})

export default app

