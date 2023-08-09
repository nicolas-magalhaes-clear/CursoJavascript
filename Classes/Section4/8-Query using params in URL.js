/*

We can query in our sql using id params in a url

like: /users/:id

then access it by: /users/2341

Example route using an id to access it
*/
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
