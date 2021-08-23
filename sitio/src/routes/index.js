var express = require('express');
var router = express.Router();

const path = require("path")

const multer = require("multer")

const { index, cartShop, admin, banner, bannerAdd } = require('../controllers/indexController');

const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/images/banner-img')
    },
    filename : (req,file,callback) => {
        callback(null,file.fieldname + 'banner-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
})


/* GET home page. */
router.get('/',index);

router.get("/shop",cartShop)

router.get("/admin",admin)

router.get("/banner/control",banner)
router.post("/banner/control",upload.single("banner"),bannerAdd);

module.exports = router;
