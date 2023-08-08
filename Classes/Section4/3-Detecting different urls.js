
const http = require('http');


//Creating server
let server = http.createServer((req, res)=>{
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);


    //Switching throught urls to define which one does other thing
    switch(req.url){
        case '/':
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/html');
            res.end('</h1>Olá</h1>');
            break;
        
        case '/users':

            //We define other type of header because we are returning a json
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify({
                users: [{
                    name: 'nicolas',
                    email: 'contato@nicolas.com.br',
                    id: 1
                }]
            }));
            break;
    }
})

server.listen(3000, '127.0.0.1', ()=> {
    console.log('Servidor rodando');
})