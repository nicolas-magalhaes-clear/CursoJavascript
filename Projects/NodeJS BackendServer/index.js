

const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');


//Creating express server
let app = express();
app.use(bodyParser.urlencoded({urlencoded: false}));

consign().include('Routes').include('utils').into(app);



 

app.listen(3000, '127.0.0.1', ()=> {
    console.log('Servidor rodando');
})