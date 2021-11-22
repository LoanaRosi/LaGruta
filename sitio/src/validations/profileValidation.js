const {check, body} = require('express-validator');
const db = require('../database/models')

const users = require('../data/users.json');

module.exports = [
   /*  body('name')
    .isEmpty().bail()
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
        max : 12,
        min : 6
    }).withMessage('La contraseña debe tener un mínimo de 6 y un máximo de 12 caracteres'),

    body('passwordConfirm')
    .custom((value,{req}) => {
        if(value !== req.body.password){
            return false
        }
        return true
    }).withMessage('La verificación de la contraseña no coincide'),
 */
]