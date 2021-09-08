var express = require('express');
var router = express.Router();

const {login, register, processLogin, processRegister, profile, logout,admin} = require("../controllers/usersController");
const registerValidation = require('../validations/registerValidation');
const loginValidation = require('../validations/loginValidation');

const upload = require('../Middlewares/userAvatarImg');

// middlewares de usuarios
const userLoginCheck = require("../Middlewares/userLoginCheck");
const userAdminCheck = require("../Middlewares/userAdminCheck");


/* GET users listing. */

router.get("/register",userLoginCheck, register);
router.post("/register", registerValidation, processRegister);

router.get("/login",userLoginCheck, login);
router.post("/login", loginValidation, processLogin);

router.get("/admin",userAdminCheck,admin);


router.get('/profile', profile)
router.get('/logout', logout)


module.exports = router;
