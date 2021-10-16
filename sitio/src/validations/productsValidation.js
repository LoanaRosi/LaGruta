const {check} = require('express-validator');

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio'),

    check('price')
    .notEmpty().withMessage('El precio es obligatorio'),

    check('sale')
    .notEmpty().withMessage('Debes indicar la categoría'),

    /* check('discount')
    .notEmpty().withMessage('Debes indicar la categoría'), */ //no es obligatorio

    check('category')
    .notEmpty().withMessage('Debes indicar la categoría'),

    check('autor')
    .notEmpty().withMessage('Debes indicar la categoría'),

    check('mecanica')
    .notEmpty().withMessage('Debes indicar la categoría'),

    check('tematica')
    .notEmpty().withMessage('Debes indicar la categoría'),

    check('editorial')
    .notEmpty().withMessage('Debes indicar la categoría'),

    check('tiempo')
    .notEmpty().withMessage('Debes indicar la categoría'),

    check('complejidad')
    .notEmpty().withMessage('Debes indicar la categoría'),

    check('idioma')
    .notEmpty().withMessage('Debes indicar la categoría'),

    check('jugadores')
    .notEmpty().withMessage('Debes indicar la categoría'),
]