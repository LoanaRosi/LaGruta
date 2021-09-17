const {check, body} = require('express-validator');

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio'),

    check('email')
    .isEmail().withMessage('Debe ingresar un email válido').bail()
    .custom(({req})=>{
        if(req !== locals.userLogin.email){
            return false
        }
        return true
    }).withMessage("Ese Gmail Ya Exite"),

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