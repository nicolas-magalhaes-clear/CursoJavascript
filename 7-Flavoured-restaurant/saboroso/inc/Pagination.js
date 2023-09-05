

const conn = require('./db');

class Pagination{

    constructor(query, params = [], itemsPerPage = 10){

        this.query = query;
        this.params = params;
        this.itemsPerPage = itemsPerPage;

    }

    getPage(page){

        this.currentPage = page - 1;

        this.params.push(
            this.currentPage * this.itemsPerPage,
            this.itemsPerPage
        )
        return new Promise((resolve, reject) => {

            conn.query([this.query, "SELECT FOUND_ROWS() AS FOUND_ROWS"].join(';'), this.params, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {

                    this.data = result[0]
                    this.total = result[1][0].FOUND_ROWS
                    this.totalPages = Math.ceil(this.total / this.itemsPerPage)
                    this.currentPage +=1
                    resolve(this.data)
                }
            })

        })
    }//end method getPages


    getTotal(){
        return this.total;
    }

    getCurrentPage(){
        return this.currentPage;
    }
    getTotalPages(){
        return this.totalPages;
    }

}

module.exports = Pagination;