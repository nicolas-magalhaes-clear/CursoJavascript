/*

We can define routes to our code, making it more organized
spliting the files where the routes are located

in this example whe define 2 routes, index and users
and define it to our app

*/

const express = require('express');
let routesIndex = require('./Routes/index')
let routesUsers = require('./Routes/users');


//Creating express server
let app = express();


//Here we are defining which archives are responsible for our routes
app.use(routesIndex);
app.use('/users',routesUsers);

 

app.listen(3000, '127.0.0.1', ()=> {
    console.log('Servidor rodando');
})


//How it should look like in our Routes/index.js
let express = require('express');
let routes = express.Router();
routes.get('/', (req, res) =>{
    
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.end('</h1>Olá</h1>');
});
module.exports = routes;

//How it should look in our Routes/users.js
let express = require('express');
let routes = express.Router();

routes.get('/', (req, res) =>{
    res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify({
                users: [{
                    name: 'nicolas',
                    email: 'contato@nicolas.com.br',
                    id: 1
                }]
            }));
});
routes.get('/admin', (req, res) =>{
    res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify({
                users: []
            }));
});
module.exports = routes;