

const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
//const expressValidator = require('express-validator');


//Creating express server
let app = express();
app.use(bodyParser.urlencoded({urlencoded: false}));
app.use(bodyParser.json());
//app.use(expressValidator());

consign().include('Routes').include('utils').into(app);



 

app.listen(4000, '127.0.0.1', ()=> {
    console.log('Servidor rodando');
})