import { cartService } from '../../../dependencies/cart.js';
import { userService } from '../../../dependencies/user.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { adminNewUserNotification } from '../../../utils/notifications.js';
import logger, { routeLogger } from '../../../utils/logger.js';
import { authHash } from '../../../utils/authHash.js';

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

        let usuario = await userService.getByUserName(username);

        done(null, usuario);

    } catch (error) {

        logger.error(error);

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

                    const usuario = await userService
                        .getByUserName(username);

                    if (usuario) {

                        return done(null, false);

                    }

                    const cart = await cartService
                        .createCart();
                    
                    let newUser = await userService
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

                    let usuario = await userService.getByUserName(username);



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


