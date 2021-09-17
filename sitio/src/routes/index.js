var express = require('express');
var router = express.Router();
const path = require("path")
const multer = require("multer")

const { index, cartShop,search,contact} = require('../controllers/indexController');


/* GET home page. */
router.get('/',index);
router.get("/result",search);
router.get("/cart",cartShop);
router.get("/contact",contact)

module.exports = router;
