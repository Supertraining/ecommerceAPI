export const isAdmin = async (req, res, next) => {
		
    const admin = await req.user?.admin;

    !admin
        
        ? res.status(401).json({ error: -1, descripcion: `La ruta ${req.originalUrl }, metodo: ${req.method}, no autorizada` })

        : next();

};