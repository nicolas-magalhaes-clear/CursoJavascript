let neDB = require('nedb');
let db = new neDB({
    filename: 'users.db',
    autoload: true
})

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
    app.post('/users', (req, res) =>{
       
        //Using neDB to insert a data
        db.insert(req.body, (err, user) => {

            if(err){
                console.log(`error: ${err} `);
                res.status(400).json({
                    error: err
                });
            }
            else{
                res.status(200).json(user);
            }
        });
    });
};
