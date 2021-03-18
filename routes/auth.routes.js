const {Router} = require('express');
const {check} = require('express-validator');
const {validateJWT} = require('../middlewares/validateJWT');
const router = Router();

const {login, createUser, revalidateToken} = require('../controllers/auth.controller');
const { validate } = require('../middlewares/validate');

router.post ('/login', [
    check('email', 'Usuario o Contraseña incorrecta').isEmail(),
    check('password', 'Usuario o Contraseña incorrecta').isLength({min:6}),
    validate
], login);

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe contener mínimo 6 caracteres').isLength({min:6}),
    validate
], createUser);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;