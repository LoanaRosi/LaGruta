var express = require('express');
var router = express.Router();

const { formulario1, formulario2, formulario3, formulario4, formulario5, formulario6 } = require('../controllers/formulario')

router.get('/formulario1',formulario1);
router.get('/formulario2',formulario2);
router.get('/formulario3',formulario3);
router.get('/formulario4', formulario4);
router.get('/formulario5', formulario5);
router.get('/formulario6', formulario6);
module.exports = router;

