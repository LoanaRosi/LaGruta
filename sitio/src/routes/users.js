var express = require('express');
var router = express.Router();


const {login, register, processLogin, processRegister, profile, logout} = require("../controllers/usersController");
const registerValidation = require('../validations/registerValidation');
const loginValidation = require('../validations/loginValidation');

/* GET users listing. */

router.get("/login", login);
router.get("/register", register);

router.post("/login", loginValidation, processLogin);
router.post("/register", registerValidation, processRegister);

router.get('/profile', profile)
router.get('/logout', logout)


module.exports = router;
