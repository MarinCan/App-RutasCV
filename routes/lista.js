const express = require('express');
const router = express.Router();
const pool = require('../database')


/* GET users listing. */
router.get('/', async function(req, res, next) {

    const [rutas] = await pool.query('SELECT * FROM rutas')
    const [contador] = await pool.query('SELECT COUNT(*) AS total FROM rutas')
    // console.log(rutas)
    res.render('lista', { rutas, contador });
});

router.post('/', async (req, res) => {
    // console.log(req.body)

    var consulta_filtro = "SELECT * FROM rutas"

    var obj = JSON.parse(JSON.stringify(req.body))
    console.log(obj)
    console.log(Object.keys(obj).length)
    console.log(Object.keys(obj))

    var filtro = Object.keys(obj)

    if (filtro.includes("Valencia") || filtro.includes("Alicante") || filtro.includes("Castellón") && filtro.includes("Baja") || filtro.includes("Media") || filtro.includes("Alta") ){

        if ( filtro.includes("Valencia") || filtro.includes("Alicante") || filtro.includes("Castellón") ){        
            const provString = filtro.map(prov => `'${prov}'`).join(',')
            consulta_filtro += ` WHERE provincia IN (${provString})`
        }
    
        if ( filtro.includes("Baja") || filtro.includes("Media") || filtro.includes("Alta") ){        
            const difString = filtro.map(dificultad => `'${dificultad}'`).join(',')
            consulta_filtro += ` AND dificultad IN (${difString})`
        }
    } else if ( filtro.includes("Valencia") || filtro.includes("Alicante") || filtro.includes("Castellón") ){        
        const provString = filtro.map(prov => `'${prov}'`).join(',')
        consulta_filtro += ` WHERE provincia IN (${provString})`
    } else if ( filtro.includes("Baja") || filtro.includes("Media") || filtro.includes("Alta") ){        
        const difString = filtro.map(dificultad => `'${dificultad}'`).join(',')
        consulta_filtro += ` WHERE dificultad IN (${difString})`
    }

    if ( filtro.includes("distancia") ){        
        
        consulta_filtro += ` ORDER BY distancia`
    }

    console.log(consulta_filtro)

    var contador_consulta = consulta_filtro.replace('*', 'COUNT(*) AS total')
    console.log(contador_consulta)

    const [rutas] = await pool.query(consulta_filtro)
    const [contador] = await pool.query(contador_consulta)
    // console.log(rutas)
    res.render('lista', { rutas, contador });
})

module.exports = router;
