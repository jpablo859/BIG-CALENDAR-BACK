const jwt = require('jsonwebtoken');

const validateJWT = async (req, res, next) => {

    const token = req.header('x-api-key');

    if (!token) return res.status(401).json({
        ok: false,
        msg: 'No hay token en la petición'
    })

    try {
        const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.name = name;

    } catch(err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        })
    }

    next();
}

module.exports = {
    validateJWT
}