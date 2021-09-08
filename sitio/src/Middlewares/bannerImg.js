//multer banner
const path = require('path');
const multer = require('multer');

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

module.exports = upload