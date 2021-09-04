const {check} = require('express-validator');

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio'),

    check('price')
    .notEmpty().withMessage('El precio es obligatorio'),

    check('category')
    .notEmpty().withMessage('Debes indicar la categoría'),
]