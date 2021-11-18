const {check, body} = require('express-validator');
const db = require('../database/models')

const users = require('../data/users.json');

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({
        min : 2
    }).withMessage('El nombre debe tener un mínimo de 2 caracteres'),

    body('email')
    .isEmail().withMessage('Debe ingresar un email válido').bail()
    .custom( value => {
       
        return db.User.findOne({
            where : {
                email : value
            }
        })
            .then(user => {
                if(user){
                    return Promise.reject('El email ya se encuentra registrado')
                }
            })
    }),

    check('password')
    .isLength({
        max : 16,
        min : 6
    }).withMessage('La contraseña debe tener un mínimo de 6 y un máximo de 16 caracteres'),

    body('passwordConfirm')
    .custom((value,{req}) => {
        if(value !== req.body.password){
            return false
        }
        return true
    }).withMessage('La verificación de la contraseña no coincide'),

    check('terminos')
    .isString('on').withMessage('Debes aceptar los términos y condiciones')
]