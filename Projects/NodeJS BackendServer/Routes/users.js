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
