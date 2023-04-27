import UsersServices from '../../services/users.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import CartsServices from '../../services/carts.js';
import { adminNewUserNotification } from '../../utils/notifications.js';
import logger, { routeLogger } from '../../utils/logger.js';
import { authHash } from '../../utils/authHash.js';

const cartServices = new CartsServices();
const userServices = new UsersServices();

passport.serializeUser(async (user, done) => {

    try {

        let username = await user.username

        done(null, username);

    }
    catch (error) {
        logger.error(error);

    }
});

passport.deserializeUser(async (username, done) => {

    try {

        let usuario = await userServices.getByUserName(username);

        done(null, usuario);

    } catch (error) {

        logger.eror(error);

    }
});

export const passportRegister = async (req, res, next) => {

    try {

        passport.use(

            'register',

            new LocalStrategy(

                {
                    passReqToCallback: true,
                },

                async (req, username, password, done) => {
                  
                    const usuario = await userServices
                        .getByUserName(username);
                   
                    const cart = await cartServices
                        .createCart();

                    if (usuario) {
                        
                        return done(null, false);

                    }
                    
                    let newUser = await userServices
                        .insertUser(

                            {
                                username,
                                password,
                                ...req.body,
                                imagen: `http://localhost:8080/imagen/${req.body.username}`,
                                cartId: cart._id.valueOf(),
                                admin: req.body.admin || false
                            }

                        );
                         
                    if (newUser) {
                        adminNewUserNotification(req.body);
                    }

                    done(null, newUser);

                }
            )
        );

    } catch (error) {

        routeLogger(req, 'error', error);

    }

    next();
}

export const passportLogin = async (req, res, next) => {

    try {

        passport.use(

            'login',

            new LocalStrategy(

                async (username, password, done) => {

                    let usuario = await userServices.getByUserName(username);



                    if (!usuario) {

                        return done(null, false);

                    }

                    let auth = await authHash(password, usuario);
                    
                    if (!auth) {

                        return done(null, false);

                    }

                    return done(null, usuario);

                })
        );

    } catch (error) {

        routeLogger(req, 'error', error);

    }

    next();
}


