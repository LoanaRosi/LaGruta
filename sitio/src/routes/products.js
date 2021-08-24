var express = require('express');
var router = express.Router();
const path = require('path');

const multer = require('multer');

const { list, detail, create, store, edit, update,destroy } = require("../controllers/productsController");

const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/images/productos')  //ubicacion para guardar los archivos
    },
    filename : (req,file,callback) => {
        callback(null,file.fieldname + 'product-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
})


router.get("/products",list); /* muestra todos los productos */

router.get("/product/:id",detail);

router.get("/admin",create); /* ruta de cracion de producto */
router.post("/admin",upload.single("img-product"),store); /* guarda un producto */

router.get('/edit/:id', edit); /* edita un producto */
router.put('/edit/:id',upload.single('img'), update); /* actualiza datos de un producto */

router.delete("/product/:id",destroy) /* elimina un producto */


module.exports = router