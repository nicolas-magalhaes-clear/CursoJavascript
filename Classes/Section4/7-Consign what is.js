/*

Consign is a addon that can be used with express to facilitate the creation of routes,
we can use it to define a directory that contains the routes

First we install it: npm install consign --save
How to declare consign:
*/


const express = require('express');
const consign = require('consign');


//Creating express server
let app = express();
//In this area e define that consign will include the "string" that is the directory where our routes are defined
//Into (app) that is our express application
consign().include('Routes').into(app);

app.listen(3000, '127.0.0.1', ()=> {
    console.log('Servidor rodando');
})


//Lets suppose that the following code are in the path Routes/users.js
module.exports = (app)=>{
    app.get('/users', (req, res) =>{
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
    app.get('/users/admin', (req, res) =>{
        res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.end(JSON.stringify({
                    users: []
                }));
    });
};
//When we acess the url /users or /users/admin consign will redirect us to these
//He make the routes like a function so instead of declaring a var routes we use app that
//is passed as a parameter