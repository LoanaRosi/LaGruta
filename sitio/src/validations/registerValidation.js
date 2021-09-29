const {check, body} = require('express-validator');

const users = require('../data/users.json');

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio'),

    body('email')
    .isEmail().withMessage('Debe ingresar un email válido').bail()
    .custom((value,{req})=>{
        let user = users.filter(user => user.email == req.body.email)

        if(user == false){
            return true
        }else{
            return false
        }
    }).withMessage("Ese Email Ya Existe"),

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

    check('terminos')
    .isString('on').withMessage('Debes aceptar los términos y condiciones')
]