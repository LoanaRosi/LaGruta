var express = require('express');
var router = express.Router();

const { formulario1 } = require('../controllers/formulario1')

router.get('/formulario1',formulario1)

module.exports = router;

