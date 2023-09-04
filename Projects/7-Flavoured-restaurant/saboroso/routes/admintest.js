const express = require('express');
const menus = require('../inc/menus');

const router = express.Router();





router.post('/testando', async(req,res,next)=>{

//    const result1 = await 
    menus.save(req.fields, req.files).then((results)=>{
        console.log('##################################')
        console.log('RESULTADOS')
        console.log(results)
    
        res.send(results)        
    })


})

module.exports = router