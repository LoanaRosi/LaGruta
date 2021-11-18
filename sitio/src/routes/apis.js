var express = require('express');
var router = express.Router();

const {changeImage} = require("../controllers/apiController")

router.post("/change-image/:id", changeImage);



module.exports = router