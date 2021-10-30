var express = require('express');
var router = express.Router();

const {login, register, processLogin, processRegister, profile, logout,admin,profileEdit, profileUpdate} = require("../controllers/usersController");
const registerValidation = require('../validations/registerValidation');
const loginValidation = require('../validations/loginValidation');



// middlewares de usuarios
const userLoginCheck = require("../Middlewares/userLoginCheck");
const userAdminCheck = require("../Middlewares/userAdminCheck");
const userAvatarImg = require('../Middlewares/userAvatarImg');
const userRegisterCheck = require("../Middlewares/userRegisterCheck");


/* GET users listing. */

router.get("/register",userLoginCheck, register);
router.post("/register",userAvatarImg.array("avatar"),registerValidation, processRegister);

router.get("/login",userLoginCheck, login);
router.post("/login", loginValidation, processLogin);

router.get("/admin"/* ,userAdminCheck */,admin);


router.get('/profile', userRegisterCheck,profile);
router.get('/logout', logout);

router.get('/profileEdit', profileEdit);
router.put('/profileUpdate', userAvatarImg.array("avatar"), profileUpdate);


module.exports = router;
