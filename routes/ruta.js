const express = require('express');
const router = express.Router();
const pool = require('../database')

/* GET rutas */
router.get('/:id', async function(req, res, next) {
  
  const id_ruta = req.params.id

  const [info] = await pool.query('SELECT * FROM rutas WHERE id = ?', id_ruta)
  const [img_ruta] = await pool.query('SELECT * from img_rutas WHERE id_ruta = ?', id_ruta)
  const [comentarios] = await pool.query('SELECT * FROM comentarios WHERE id_ruta = ?', id_ruta)

  res.render('ruta', { info, img_ruta, comentarios });
});


/* POST rutas para los COMENTARIOS */
router.post('/:id', async function(req, res, next) {

  const id_ruta = parseInt(req.params.id)  
  const nombre_completo = req.body.nombre_completo
  const comentario = req.body.comentario

  await pool.query('INSERT INTO comentarios SET ?', {
    id_ruta,
    nombre_completo,
    comentario
  })

  res.redirect('/ruta/'+id_ruta);
});

/* GET like (voto positivo) */
router.get('/like/:id', async function(req, res, next) {
  
  const id_ruta = req.params.id

  await pool.query('UPDATE rutas SET votos=votos+1 WHERE id = ?', id_ruta)

  res.redirect('/ruta/'+id_ruta);
});

/* GET dislike (voto negativo) */
router.get('/dislike/:id', async function(req, res, next) {
  
  const id_ruta = req.params.id

  await pool.query('UPDATE rutas SET votos=votos-1 WHERE id = ?', id_ruta)

  res.redirect('/ruta/'+id_ruta);
});

module.exports = router;
