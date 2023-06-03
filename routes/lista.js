const express = require('express');
const router = express.Router();
const pool = require('../database')


/* GET lista rutas */
router.get('/', async function(req, res, next) {

    const [rutas] = await pool.query('SELECT * FROM rutas')
    const [contador] = await pool.query('SELECT COUNT(*) AS total FROM rutas')
    const [imagen] = await pool.query('SELECT url_imagen from img_rutas JOIN rutas ON img_rutas.id_ruta = rutas.id GROUP BY img_rutas.id_ruta')
    // console.log(rutas[0])
    // console.log(imagen[0])
    res.render('lista', { rutas, contador, imagen });
});

/* POST para el filtrado de la lista rutas */
router.post('/', async (req, res) => {

    var consulta_filtro = "SELECT * FROM rutas"
    var subconsulta_filtro_img = "SELECT id FROM rutas"

    var obj = JSON.parse(JSON.stringify(req.body))
    // console.log(obj)
    // console.log(Object.keys(obj).length)
    // console.log(Object.keys(obj))

    var filtro = Object.keys(obj)

    if ((filtro.includes("Valencia") || filtro.includes("Alicante") || filtro.includes("Castellón")) && (filtro.includes("Baja") || filtro.includes("Media") || filtro.includes("Alta")) ){

        if ( filtro.includes("Valencia") || filtro.includes("Alicante") || filtro.includes("Castellón") ){        
            const provString = filtro.map(prov => `'${prov}'`).join(',')
            consulta_filtro += ` WHERE provincia IN (${provString})`
            subconsulta_filtro_img += ` WHERE provincia IN (${provString})`
        }
    
        if ( filtro.includes("Baja") || filtro.includes("Media") || filtro.includes("Alta") ){        
            const difString = filtro.map(dificultad => `'${dificultad}'`).join(',')
            consulta_filtro += ` AND dificultad IN (${difString})`
            subconsulta_filtro_img += ` AND dificultad IN (${difString})`
        }
    } else if ( filtro.includes("Valencia") || filtro.includes("Alicante") || filtro.includes("Castellón") ){        
        const provString = filtro.map(prov => `'${prov}'`).join(',')
        consulta_filtro += ` WHERE provincia IN (${provString})`
        subconsulta_filtro_img += ` WHERE provincia IN (${provString})`
    } else if ( filtro.includes("Baja") || filtro.includes("Media") || filtro.includes("Alta") ){        
        const difString = filtro.map(dificultad => `'${dificultad}'`).join(',')
        consulta_filtro += ` WHERE dificultad IN (${difString})`
        subconsulta_filtro_img += ` WHERE dificultad IN (${difString})`
    }

    var consulta_filtro_img = 'SELECT * from img_rutas JOIN rutas ON img_rutas.id_ruta = rutas.id WHERE rutas.id IN ( ' + subconsulta_filtro_img + ' ) GROUP BY img_rutas.id_ruta'

    if ( filtro.includes("distancia") ){                
        consulta_filtro += ` ORDER BY distancia`
        consulta_filtro_img += ` ORDER BY rutas.distancia`
    }

    var contador_consulta = consulta_filtro.replace('*', 'COUNT(*) AS total')

    const [rutas] = await pool.query(consulta_filtro)
    const [contador] = await pool.query(contador_consulta)
    const [imagen] = await pool.query(consulta_filtro_img)

    res.render('lista', { rutas, contador, imagen });
})

module.exports = router;
