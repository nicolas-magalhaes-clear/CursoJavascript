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
