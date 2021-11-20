var express = require('express');
var router = express.Router();
const path = require("path")
const multer = require("multer")
const nodemailer = require("nodemailer");

const { index, cartShop,search,contact,about,mailsend} = require('../controllers/indexController');


/* GET home page. */
router.get('/',index);
router.get("/result",search);
router.get("/cart",cartShop);
router.get("/contact",contact);
router.post("/contact",mailsend);
router.get("/about",about);


module.exports = router;
