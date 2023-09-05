var conn = require('./db');
const connpromise = require('./promisedb');

module.exports = {


    render(req, res, error) {

        res.render('admin/login', {
            body: req.body,
            error
        })

    },
    login(email, password) {
        return new Promise((s, f) => {

            conn.query(`
            SELECT * FROM tb_users WHERE email = ?`,
                [email],
                (err, results) => {
                    if (err) {
                        f(err);
                    }
                    else {
                        if (!results.length > 0) {
                            f({ message: 'Usuário ou senha incorretos' });
                        }
                        else {
                            let row = results[0];
                            if (row.password !== password) {
                                f({ message: 'Usuário ou senha incorretos' });
                            }
                            else {
                                s(row)
                            }
                        }


                    }
                })


        })
    },
    async getUsers() {
        return new Promise((s, f) => {
            conn.query('SELECT * FROM tb_users ORDER BY id', (err, result) => {

                if (err) {
                    f(err)
                }
                else {
                    s(result)
                }
            })
        })
    },
    async save(fields) {

        console.log('CHeGOU EM SAVETEST')
        console.log(fields)
        let query, params;

        console.log('fields:', fields)



        //verifies if fields.id is bigger than 0, this specifies if we are creating or updating a query
        if (parseInt(fields.id) >= 0) {
            //UPDATE

            if(fields.password){
                query = 'UPDATE tb_users SET name = ?, email = ?, password = ? WHERE id = ?'    
                params = [
                    fields.name,
                    fields.email,
                    fields.password,
                    fields.id
                ]
            }
            else{
                query = 'UPDATE tb_users SET name = ?, email = ? WHERE id = ?'
                params = [
                    fields.name,
                    fields.email,
                    fields.id
                ]
            }
            

            

        }
        else {

            //INSERT
            query = "INSERT INTO tb_users (name, email, password, register) VALUES (?, ?, ? ,?)"

            params = [
                fields.name,
                fields.email,
                fields.password,
                new Date()
            ]
        }

        console.log('AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
        let aux;
        await connpromise.query(query, params).then((result) => {
            console.log('Corrigido')
            console.log('result', result);
            aux = result
        })
        console.log('RESULTE:', aux);
        return aux
    },
    delete(id){
        return new Promise((resolve, reject)=>{
      
            conn.query('DELETE FROM tb_users WHERE id = ?', [id], (err, result)=>{
              if(err){
                console.log('ERRO PROMISE:', err)
                reject(err);
              }             
              else{
                resolve(result)
              }                                                                                               
            })
      
          })
    }
}