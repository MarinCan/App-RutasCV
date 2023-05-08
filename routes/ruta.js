const express = require('express');
const router = express.Router();
const pool = require('../database')

/* GET users listing. */
router.get('/:id', async function(req, res, next) {
  
    const id_ruta = req.params.id
    // console.log(req.params.id)
    const [info] = await pool.query('SELECT * FROM rutas WHERE id = ?', id_ruta)
  
    res.render('ruta', { info });
  });

module.exports = router;
