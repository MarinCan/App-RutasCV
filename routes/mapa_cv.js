const express = require('express');
const router = express.Router();
const pool = require('../database')


/* GET mapa CV */
router.get('/', function(req, res, next) {
    const rutas = {}

    res.render('mapa_cv', {rutas});
});

/* POST mapa CV - Selección de parque */
router.post('/', async (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body))
    var parque = Object.keys(obj)

    var consulta_img = ` SELECT * from img_rutas JOIN rutas ON img_rutas.id_ruta = rutas.id WHERE rutas.id IN ( SELECT id FROM rutas WHERE parque_natural = '${parque}' ) GROUP BY img_rutas.id_ruta LIMIT 1 `
    var [rutas] = await pool.query(consulta_img)

    res.render('mapa_cv', {rutas} )
})

module.exports = router;
