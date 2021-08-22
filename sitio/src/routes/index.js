var express = require('express');
var router = express.Router();

const { index, cartShop, admin } = require('../controllers/indexController');


/* GET home page. */
router.get('/',index);

router.get("/shop",cartShop)

router.get("/admin",admin)

module.exports = router;
