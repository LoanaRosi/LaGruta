const {check} = require('express-validator');
const users = require('../data/users.json');
const bcrypt = require('bcryptjs');

module.exports = [
    check('email')
    .notEmpty().withMessage('El email no puede estar vacío')
    .isEmail().withMessage('Debe ingresar un email válido')
    .custom((value,{req}) => {
        let user = users.find(user => user.email === value.trim() && bcrypt.compareSync(req.body.password.trim(), user.password))
        if(user){
            return true
        }else{
            return false
        }
    }).withMessage('Credenciales inválidas'),
]