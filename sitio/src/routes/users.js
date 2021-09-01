var express = require('express');
var router = express.Router();

const {login,register,proccesRegister} = require("../controllers/usersController")

/* GET users listing. */

router.get("/login",login);

router.get("/register",register);
router.post("/register",proccesRegister)



module.exports = router;
