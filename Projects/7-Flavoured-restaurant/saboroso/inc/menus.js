

let conn = require('./db');
const path = require('path');


module.exports = {

  /**
   * funcao ok okokokokok
   * @returns 
   */
  async getById(fields) {

    let query = 'SELECT * FROM tb_menus WHERE id = ?';
    let params = [
        fields.id
    ]
    console.log('Ok carai')
    return new Promise((s, f) => {
      conn.query(query, params, (err, result) => {
        if (err) {
          f(err);
        }
        else {
          s(result);
        }
      })
    })
  }
  ,
  getMenus() {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM tb_menus ORDER BY id`,
        (err, results) => {
          if (err) {
            reject(err)
          }
          else {
            resolve(results)
          }
        })
    })
  },
  async save(fields, files) {

    console.log('CHEGOU EM SAVE')

    let query, params;


    if (Object.keys(files).length === 0) {
      console.log('Objeto vazio')
      
      await this.getById(fields).then(result => {

        console.log('RESULT CHEGOU', result)

        fields.photo = result[0].photo
        
      }).catch(err => {
        
        console.log('err:', err)

      })
    }


    

    console.log('valor de fields agora', fields)
    if (parseInt(fields.id) >= 0) {
      console.log('UPDATE METHOD')
      query = `
        UPDATE tb_menus
        SET title = ?,
        description = ?,
        price = ?,
        photo = ?,
        WHERE id = ?`

      params = [
        fields.title,
        fields.description,
        fields.price,
        fields.photo,
        fields.id
      ]
      console.log('fields aqui:', fields)
    }
    else {
      console.log('INSERT METHOD')
      query = "INSERT INTO tb_menus (title, description, price, photo) VALUES (?, ?, ? ,?)"

      params = [
        fields.title,
        fields.description,
        fields.price,
        fields.photo
      ]
    }

    return new Promise((resolve, reject) => {

      conn.query(query, params, (err, result) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(result)
        }
      })
    })
  }
}