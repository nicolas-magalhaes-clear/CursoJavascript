const db2 = require('mysql2-promise')();

db2.configure({
    'host': 'localhost',
    'user': 'user',
    'password': 'Senhafacil123@',
    'database': 'saboroso'
})

module.exports = db2