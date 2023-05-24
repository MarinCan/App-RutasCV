const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

/* GET users listing. */
router.get('/', function(req, res, next) {
  var aviso = ""
  res.render('contacto', {aviso});
});

// POST para enviar email
router.post("/", (req, res, next) => {
  const user_nombre = req.body.nombre
  const user_apellidos = req.body.apellidos
  const user_email = req.body.email
  const user_mensaje = req.body.mensaje
  // console.log(user_nombre)
  // console.log(user_email)

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }

  });

  var mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: 'Mensaje de contacto del portal de Rutas CV',
    text: `El usuario ${user_nombre} ${user_apellidos}, con email ${user_email} ha mandado el siguiente mensaje: 
    ${user_mensaje}` 
  };

  transporter.sendMail(mailOptions,(err,res)=>{
    if(err){
      console.log(err);
    }
    else {
      console.log('Mensaje enviado');
    }
  });

  var aviso = "Se ha enviado tu mensaje."
  // console.log(aviso)
  res.render('contacto', {aviso});
})

module.exports = router;
