const Colors = require('./ConsoleColors')
const Pagination = require('./Pagination');
const moment = require('moment')
var conn = require('./db')

let prefix;
module.exports = {

    render(req, res, error, sucess) {

        res.render('reservations', {
            title: 'Reservas - Restaurante Saboroso',
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma mesa!',
            body: req.body,
            error,
            sucess
        })
    },
    save(fields) {

        let date = fields.date.split('-');
        console.log('DATE:', date)
        fields.date = `${date[0]}-${date[1]}-${date[2]}`;


        console.log('fields date:', fields.date)
        return new Promise((s, f) => {

            let query, params;

            params = [
                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time,
            ]
            if (parseInt(fields.id) >= 0) {
                console.log('METHOD UPDATE')
                query = `UPDATE tb_reservations SET name = ?, email = ?, people = ?, date = ?, time = ? WHERE id = ?`
                params.push(fields.id)

            }
            else {
                console.log('METHOD INSERT')
                query = "INSERT INTO tb_reservations (name, email, people, date, time) VALUES (?, ?, ?, ?, ?)"

            }
            console.log(fields)
            conn.query(query, params, (err, result) => {

                if (err) {
                    f(err);
                }
                else {
                    s(result)
                }

            })
        })
    },
    getReservations(req) {

        return new Promise((resolve, reject) => {
            prefix = Colors.cyan('[RESERVATIONS.JS]') + Colors.yellow('[getReservations]')
            console.log(prefix, 'Method accessed')
            console.log(prefix, 'Starting promise')
            console.log(prefix, 'Values in req.query', Colors.white(req.query));


            let page = req.query.page
            let dtstart = req.query.start;
            let dtend = req.query.end;

            if (!page) page = 1;

            let params = []

            if (dtstart && dtend) params.push(dtstart, dtend)

            let pag = new Pagination(
                `SELECT SQL_CALC_FOUND_ROWS * FROM tb_reservations 
            ${(dtstart && dtend) ? 'WHERE date between ? and ?' : ''}
            ORDER BY name LIMIT ?, ?`,
                params
            )
            console.log(prefix, 'Params values:', params)
            console.log(prefix, 'Requesting method getPage from Pagination.js with page as value')
            console.log(prefix, 'page value:', page)
            pag.getPage(page).then(data => {
                console.log(prefix, 'Result obtained from method getPage:', data)
                console.log(prefix, 'Resolving promise')
                resolve({
                    data,
                    links: pag.getNavigation(req.query)
                });
            })
        });
    },


    delete(id) {
        return new Promise((resolve, reject) => {

            conn.query('DELETE FROM tb_reservations WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result)
                }
            })

        })
    },
    chart(req) {
        return new Promise((resolve, reject) => {

            conn.query(`
            SELECT
    CONCAT(YEAR(date), '-', MONTH(date)) AS date,
    COUNT(*) AS total,
    SUM(people) / COUNT(*) AS avg_people
FROM
    tb_reservations
WHERE
    date BETWEEN ? AND ?
GROUP BY YEAR(date), MONTH(date), CONCAT(YEAR(date), '-', MONTH(date))
ORDER BY YEAR(date) DESC, MONTH(date) DESC;

            `, [
                req.query.start,
                req.query.end
            ], (err, result) => {
                if (err) {
                    reject(err)
                }
                else {

                    let months = [];
                    let values = [];

                    result.forEach(row => {
                        months.push(moment(row.date).format('MMM YYYY'));
                        values.push(row.total)
                    })
                    console.log('Resolving:', months, values)
                    resolve({
                        months,
                        values
                    })




                }
            })

        })
    }
}