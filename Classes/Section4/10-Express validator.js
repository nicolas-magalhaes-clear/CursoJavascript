/*

Express validator is a framework that
facilitates the way we validate the requisition params
like req.body or req.header

How to install it: npm install express-validator

NOTE!!!!
On the course was used an old version of express-validator
the syntax to declare the old way was
*/



//new syntax
//We pass the conditions as an array parameter
route.post(
    [
      check("name", "O nome é obrigatório.").notEmpty(),
      check("email", "Email inválido.").notEmpty().isEmail(),
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

