var express = require('express');
var router = express.Router();

const { list, detail } = require("../controllers/productsController");

router.get("/products",list)

router.get("/product",detail)

module.exports = router