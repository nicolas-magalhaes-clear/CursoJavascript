var conn = require('./db')

module.exports = {

    render(req, res, error, sucess){

        res.render('contacts', {
            title: 'Contato - Restaurante Saboroso',
            background: 'images/img_bg_3.jpg',
            h1: 'Diga um oi',
            body: req.body,
            error,
            sucess
        })

    },

    save(fields){
        return new Promise((s,f)=>{
            conn.query(`
            INSERT INTO tb_contacts (name, email, message) VALUES (?,?,?)`,
            [
                fields.name,
                fields.email,
                fields.message
            ],
            (err, result)=>{
                if(err){
                    f(err)
                }
                else{
                    s(result)
                }
            })

        })
    }
}