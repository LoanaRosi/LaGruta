var express = require('express');
var router = express.Router();

const {show, add, remove, empty} = require("../controllers/cartController")

router.get("/cart/show", show);
router.get("/cart/add/:id", add);
router.get("/cart/remove/:id",remove);
router.get("/cart/empty",empty);


module.exports = router