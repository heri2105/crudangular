const router = require('express').Router()
const conexion = require('./config/conexion')



//---------- agregamos rutas--------
//get usuarios
router.get('/',(req, res)=>{
    let sql ='SELECT * FROM usuarios where estatus = 1'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})
//get perfiles
router.get('/perfiles',(req, res)=>{
    let sql ='SELECT * FROM `perfiles` where estatus = 1'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})


// get un usuarios por id
router.get('/:id',(req, res)=>{
    const {id} = req.params
    let sql ='SELECT * FROM usuarios where id = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})





//agregar usuarios
router.post('/',( req, res)=>{
    const{username,password,correo,telefono,seleccionado} = req.body

    let sql = `INSERT INTO usuarios(username,password,perfil_id,correo,telefono,estatus) VALUES ('${username}','${password}','${seleccionado}','${correo}','${telefono}',1)`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'Usuario agregado'})
        }
    })
})

//BORRADO LOGICO
router.delete('/:id',(req, res)=>{
    const{id} = req.params
    let sql =`UPDATE usuarios SET estatus = 0 WHERE id = '${id}'`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'equipo eliminado'})
        }
    })
});

//modificar usuarios
router.put('/:id',(req, res)=>{
    const{id}=req.params
    const{username, correo,telefono} = req.body


    let sql = `update usuarios set 
        username ='${username}',
        correo='${correo}',
        telefono='${telefono}'
                where id = '${id}'`
    
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'Usuario modificado'})
        }
    })

})
//----------------------------------

module.exports = router