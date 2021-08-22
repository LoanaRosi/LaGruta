var express = require('express');
var router = express.Router();
const path = require('path');

const multer = require('multer');

const { list, detail, create, store, edit, update } = require("../controllers/productsController");

const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/images/productos')  //ubicacion para guardar los archivos
    },
    filename : (req,file,callback) => {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
})


router.get("/products",list); /* muestra todos los productos */

router.get("/product",detail);

router.get("/admin",create); /* ruta de cracion de producto */
router.post("/admin",store); /* guarda un producto */
router.get('/admin/edit/:id', edit); /* edita un producto */
router.put('/admin/edit/:id', update); /* actualiza datos de un producto */

module.exports = router