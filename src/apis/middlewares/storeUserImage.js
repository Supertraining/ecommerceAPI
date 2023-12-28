export const savePicturesLocal = async (req, res, next) => {

    try {

        const image = await req.files.imagen;

        image.mv('./public/images/' + `${req.body.username}` + '.jpg');

        next();

    } catch (error) {

        next(error);

    }

};