import { routeLogger } from '../../utils/logger.js';

export const savePicturesLocal = async (req, res, next) => {

    try {

        const image = await req.files.imagen;

        image.mv('./public/images/' + `${req.body.username}` + '.jpg');

    } catch (error) {

        routeLogger(req, 'error', error);
        next(error);

    }

    await next();

};