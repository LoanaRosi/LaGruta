var express = require('express');
var router = express.Router();


//validaciones
const {body} = require('express-validator'); 
const validateLogin = [
  body('email').isEmail().withMessage('Debes completar el campo con un email válido'),
  body('password').notEmpty().withMessage('Debes completar el campo contraseña')
]


const {login,register} = require("../controllers/usersController")

/* GET users listing. */

router.get("/login", validateLogin, login);

router.get("/register",register);



module.exports = router;
