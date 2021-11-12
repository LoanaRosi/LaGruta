const {check} = require('express-validator');

module.exports = [
    check('name')
    .notEmpty().withMessage('El Nombre Es obligatorio'),

    check('price')
    .notEmpty().withMessage('El Precio Es obligatorio'),

    check('sale')
    .notEmpty().withMessage('Debes indicar El Estado'),

    /* check('discount')
    .notEmpty().withMessage('Debes indicar la categoría'), */ //no es obligatorio

    check('category')
    .notEmpty().withMessage('Debes Indicar La Categoría'),

    check('autor')
    .notEmpty().withMessage('Debes indicar El Autor'),

    check('mecanica')
    .notEmpty().withMessage('Debes Indicar La Mecanica'),

    check('tematica')
    .notEmpty().withMessage('Debes Indicar La Tematica'),

    check('editorial')
    .notEmpty().withMessage('Debes Indicar La Editorial'),

    check('tiempo')
    .notEmpty().withMessage('Debes Indicar La Tiempo de juego'),

    check('complejidad')
    .notEmpty().withMessage('Debes Indicar La Complejidad Del Juego'),

    check('idioma')
    .notEmpty().withMessage('Debes Indicar El Idioma'),

    check('jugadores')
    .notEmpty().withMessage('Debes Indicar La Cantitad De Jugadores'),
]