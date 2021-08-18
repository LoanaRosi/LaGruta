var express = require('express');
var router = express.Router();

const { index, cartShop } = require('../controllers/indexController');


/* GET home page. */
router.get('/',index);

router.get("/shop",cartShop)

module.exports = router;
