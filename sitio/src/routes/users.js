var express = require('express');
var router = express.Router();


const {login, register, processLogin, processRegister, profile, logout} = require("../controllers/usersController");
const registerValidation = require('../validations/registerValidation');
const loginValidation = require('../validations/loginValidation');
const upload = require('../Middlewares/userAvatarImg');

/* GET users listing. */

router.get("/register", register);
router.post("/register", upload, registerValidation, processRegister);

router.get("/login", login);
router.post("/login", loginValidation, processLogin);


router.get('/profile', profile)
router.get('/logout', logout)


module.exports = router;
