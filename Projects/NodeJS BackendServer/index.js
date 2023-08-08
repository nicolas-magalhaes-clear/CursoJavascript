

const express = require('express');
let routesIndex = require('./Routes/index')
let routesUsers = require('./Routes/users');


//Creating express server
let app = express();

app.use(routesIndex);
app.use('/users',routesUsers);

 

app.listen(3000, '127.0.0.1', ()=> {
    console.log('Servidor rodando');
})