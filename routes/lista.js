var express = require('express');
var router = express.Router();
const pool = require('../database')


/* GET users listing. */
router.get('/', async function(req, res, next) {
    const [rutas] = await pool.query('SELECT * FROM rutas')
    // console.log(rutas)
    res.render('lista', { rutas });
});

module.exports = router;
