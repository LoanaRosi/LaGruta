var express = require('express');
var router = express.Router();

const { list, detail, create, store } = require("../controllers/productsController");

router.get("/products",list); /* muestra todos los productos */

router.get("/product",detail);

router.get("/admin",create); /* ruta de cracion de producto */
router.post("/admin",store); /* guarda un producto */

module.exports = router