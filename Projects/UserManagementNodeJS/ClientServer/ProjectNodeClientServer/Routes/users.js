const { check, validationResult } = require("express-validator");

let neDB = require('nedb');
let db = new neDB({
    filename: 'users.db',
    autoload: true
})

module.exports = (app)=>{

    let route = app.route('/users');
    //GET is used to get data
    route.get((req, res) =>{

        db.find({}).sort({name:1}).exec((err, users)=>{
            if(err){
                app.utils.error.send(err, req, res)
            }
            else{
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json({
                    users
            });
            }
        })
        
            
    });
    
    //alteração na syntax atualização do express-validator
    route.post(
        [
          check("_name", "O nome é obrigatório.").notEmpty(),
          check("_ email", "Email inválido.").notEmpty().isEmail(),
        ],
        (req, res) => {
          let errors = validationResult(req);
     
          if (!errors.isEmpty()) {
            app.utils.error.send(errors, req, res);
            return false;
          }
     
          db.insert(req.body, (err, user) => {
            if (err) {
              app.utils.error.send(err, req, res);
            } else {
              res.status(200).json(user);
            }
          });
        }
      );

    


    let routeId = app.route('/users/:id');

    routeId.get((req, res) =>{
        db.findOne({_id:req.params.id}).exec((err, user)=>{
            if(err){
                app.utils.error.send(err, req, res)
            }
            else{
                res.status(200).json(user);
            }
        })
    })
    

    //put is used to insert data
    routeId.put((req, res) =>{
        db.update({_id:req.params.id}, req.body, err=>{
            if(err){
                app.utils.error.send(err, req, res)
            }
            else{
                res.status(200).json(Object.assign(req.params, req.body));
            }
        })
    })

    //DELETE is used to delete data
    routeId.delete((req, res)=>{
        
        db.remove({_id: req.params.id}, {}, err=>{
            if(err){
                app.utils.error.send(err, req, res)
            }
            else{
                res.status(200).json(Object.assign(req.params));
            }
        })
    })
};
