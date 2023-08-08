

const express = require('express');
const consign = require('consign');


//Creating express server
let app = express();

consign().include('Routes').into(app);



 

app.listen(3000, '127.0.0.1', ()=> {
    console.log('Servidor rodando');
})