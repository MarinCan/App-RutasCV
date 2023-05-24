const express = require('express');
const router = express.Router();
const pool = require('../database')


/* GET users listing. */
router.get('/', function(req, res, next) {
    const rutas = {}

    res.render('mapa_cv', {rutas});
});

router.post('/', async (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body))
    var parque = Object.keys(obj)

    // var consulta = `SELECT * FROM rutas WHERE parque_natural = '${parque}' `
    // console.log(consulta)

    var consulta_img = ` SELECT * from img_rutas JOIN rutas ON img_rutas.id_ruta = rutas.id WHERE rutas.id IN ( SELECT id FROM rutas WHERE parque_natural = '${parque}' ) GROUP BY img_rutas.id_ruta LIMIT 1 `
    // console.log(consulta_img)

    // var [ruta] = await pool.query(consulta)
    // console.log(ruta)

    var [rutas] = await pool.query(consulta_img)
    console.log(rutas)


    res.render('mapa_cv', {rutas} )
})

module.exports = router;
