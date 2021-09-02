var express = require('express');
var router = express.Router();


//validaciones
const {body} = require('express-validator'); 

const validateLogin = [
  body('email').isEmail().withMessage('Debes completar el campo con un email válido'),
  body('password').notEmpty().withMessage('Debes completar el campo contraseña')
]

const validateRegister = [
  body('nombre').notEmpty().withMessage('Debes completar el campo con tu nombre y apellido'),
  body('email').isEmail().withMessage('Debes completar el campo con un email válido'),
  body('password').notEmpty().withMessage('Debes completar el campo contraseña'),
  body('passwordConfirm').notEmpty().withMessage('Debes confirmar tu contraseña'),
]


const {login,register,proccesRegister} = require("../controllers/usersController")

/* GET users listing. */

router.get("/login", validateLogin, login);

router.get("/register",validateRegister, register);

router.post("/register",proccesRegister);



module.exports = router;
