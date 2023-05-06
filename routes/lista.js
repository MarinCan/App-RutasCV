var express = require('express');
var router = express.Router();
const pool = require('../database')


/* GET users listing. */
router.get('/', async function(req, res, next) {
    const [resultado] = await pool.query('SELECT 1+1')
    console.log(resultado)
    res.render('lista');
});

module.exports = router;
