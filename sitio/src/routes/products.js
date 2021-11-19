var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

const productsValidation = require('../validations/productsValidation');

const { list, detail, create, store, edit, update,destroy, banner, bannerAdd,bannerDestroy, mediosPago,listMesa,listPrevia,listRol} = require("../controllers/productsController");

//middlewares users check
const userAdminCheck = require("../Middlewares/userAdminCheck"); //chequea que el usuari sea admin
//middlewares productos
const uploadBanner = require("../Middlewares/bannerImg");
const uploadProduct = require("../Middlewares/productMulter");
 


router.get("/list",list); /* muestra todos los productos */

router.get("/juegosDeMesa",listMesa);

router.get("/juegosDePrevia",listPrevia);

router.get("/juegosDeRol",listRol);

router.get("/detail/:id",detail);

router.get("/medios-pago",mediosPago); /* medios de pago y tarjetas */

router.get("/create"/* ,userAdminCheck */,create); /* ruta de cracion de producto */
router.post("/create",uploadProduct.array("fileImage"), productsValidation, store); /* guarda un producto */

router.get('/edit/:id'/* ,userAdminCheck */,edit); /* edita un producto */
router.put('/edit/:id',update); /* actualiza datos de un producto */

router.delete("/delete/:id",destroy) /* elimina un producto */

// rutas banner
router.get("/banner",/* userAdminCheck, */banner);
router.post("/banner",uploadBanner.single("banner"),bannerAdd);
router.delete("/banner/delete/:id",bannerDestroy);


module.exports = router