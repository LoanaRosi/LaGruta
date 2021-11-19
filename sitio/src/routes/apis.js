var express = require('express');
var router = express.Router();

const {changeImage} = require("../controllers/apiController")

const uploadProduct = require("../Middlewares/productMulter");

router.post("/change-image/:id",uploadProduct.any(), changeImage);




module.exports = router