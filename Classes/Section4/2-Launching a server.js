/*

How to create a nodeJS server
Example:

*/


//const = constant
//constant is like a var, but can't be reassigned his value
//We can use constants to define objects or functions
//Example defining a function using a constant

const exampleFunction = ()=>{

}

//Here we are saying that our program REQUIRES the library http
const http = require('http');


let server = http.createServer((req, res)=>{
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    res.end('Ok');
})

server.listen(3000, '127.0.0.1', ()=> {
    console.log('Servidor rodando');
})