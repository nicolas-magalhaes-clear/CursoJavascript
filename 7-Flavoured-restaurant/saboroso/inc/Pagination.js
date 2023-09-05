

const conn = require('./db');

class Pagination{

    constructor(query, params = [], itemsPerPage = 10){

        this.query = query;
        this.params = params;
        this.itemsPerPage = itemsPerPage;

    }

    getPage(page){
        console.log('Page recebido no getpage:', page)
        this.currentPage = page - 1;

        this.params.push(
            this.currentPage * this.itemsPerPage,
            this.itemsPerPage
        )
        console.log('Page atual getpage:', this.currentPage)
        console.log('valor de params in getpage', this.params)
        return new Promise((resolve, reject) => {
            console.log('Query a ser enviada:', [this.query, "SELECT FOUND_ROWS() AS FOUND_ROWS"].join(';'))
            console.log('Parametros a serem substituidos:', this.params)
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
    getNavigation(params){
        console.log('PARAMETROS GETNAVIGATION::::', params)
        let  limitPagesNav = 5;

        let links =  []
        
        let nrStart = 0;
        let nrEnd = 0;

        if(this.getTotalPages() < limitPagesNav){
            limitPagesNav = this.getTotalPages();
        }

        if((this.getCurrentPage() - parseInt(limitPagesNav/2)) < 1){
            nrStart = 1;
            nrEnd = limitPagesNav;
        }
        else if(this.getCurrentPage() + parseInt(limitPagesNav/2) > this.getTotalPages()){
            nrStart = this.getTotalPages() - limitPagesNav;
            nrEnd = this.getTotalPages();
        }
        else{
            nrStart = this.getCurrentPage() - parseInt(limitPagesNav/2);
            nrEnd = this.getCurrentPage() + parseInt(limitPagesNav/2);
        }

        if(this.getCurrentPage() > 1){
            links.push({
                text: '«',
                href: `?${this.getQueryString(Object.assign({}, params,{page: this.getCurrentPage()-1}))}`,
            })
        }
        for(let x = nrStart; x < nrEnd; x++){


            links.push({
                text: x,
                href: `?${this.getQueryString(Object.assign({}, params,{page: x}))}`,
                active: (x === this.getCurrentPage())
            })
        }
        if(this.getCurrentPage() < this.getTotalPages()){
            links.push({
                text: '»',
                href: `?${this.getQueryString(Object.assign({}, params,{page: this.getCurrentPage()+1}))}`,
            })
        }
        console.log('Links retornadaos', links)
        return links

    }

    getQueryString(params){

        let queryString = [];
        console.log('Params recebidos na getquerystring:', params)
        for(let name in params){
            console.log('Name:', name)
            queryString.push(`${name}=${params[name]}`)
        }
        console.log('QUERYSTRING A SER ENVIADA:', queryString)
        return queryString.join('&')
    }

}

module.exports = Pagination;