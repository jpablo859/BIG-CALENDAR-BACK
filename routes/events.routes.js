const {Router} = require('express');
const {check} = require('express-validator');
const {validateJWT} = require('../middlewares/validateJWT');
const router = Router();

const {getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events.controller');
const { validate } = require('../middlewares/validate');
const { isDate } = require('../helpers/isDate');

router.use(validateJWT);
router.get ('/', getEvents);
router.post ('/', [
    check('title', 'Título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha final es obligatoria').custom(isDate),
    validate

], createEvent);
router.put ('/:id', [
    check('title', 'Título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha final es obligatoria').custom(isDate),
    validate

], updateEvent);
router.delete ('/:id', deleteEvent);

module.exports = router;