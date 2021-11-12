const {check,body} = require('express-validator');
const users = require('../data/users.json');//
const bcrypt = require('bcryptjs');
const db = require('../database/models')

module.exports = [
    body('email')
    .isEmail().withMessage('Debe ingresar un email válido').bail()
    .custom((value,{req}) => {
        
        return db.User.findOne({
            where : {
                email : value,
            }
        })
            .then(user => {
                if(!user || !bcrypt.compareSync(req.body.password, user.password)){
                    return Promise.reject()
                }
            }).catch( () => Promise.reject('Credenciales inválidas'))
    }),
    
    check('password')
    .notEmpty().withMessage('El campo contraseña no puede estar vacío')
]