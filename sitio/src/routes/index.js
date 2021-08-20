var express = require('express');
var router = express.Router();

const { index, cartShop } = require('../controllers/indexController');
const { admin } = require('../controllers/usersController');


/* GET home page. */
router.get('/',index);

router.get("/shop",cartShop)

router.get("/admin",admin)

module.exports = router;
