
const Colors = require('./ConsoleColors')
const conn = require('./db');

class Pagination{

    constructor(query, params = [], itemsPerPage = 10){

        this.query = query;
        this.params = params;
        this.itemsPerPage = itemsPerPage;
        
    }

    getPage(page){
        let prefix = Colors.cyan('[PAGINATION.JS]')+Colors.yellow('[getPage]')

        console.log(prefix, 'Method accessed')
        console.log(prefix, 'Page received in getPage method:', page)

        this.currentPage = page - 1;

        this.params.push(
            this.currentPage * this.itemsPerPage,
            this.itemsPerPage
        )

        console.log(prefix, 'currentPage value in getPage:', this.currentPage)
        console.log(prefix, 'Params values:', this.params)
        console.log('valor de params in getpage', this.params)
        return new Promise((resolve, reject) => {
            console.log(prefix,'Query to be sent:', Colors.green([this.query, "SELECT FOUND_ROWS() AS FOUND_ROWS"].join(';')))
            console.log(prefix, 'Parameters to be replace:', this.params)
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
        let prefix = Colors.cyan('[PAGINATION.JS]')+Colors.yellow('[getNavigation]')

        console.log(prefix, 'Params values:', params)

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
        console.log(prefix, 'Returning links')
        return links

    }

    getQueryString(params){
        let prefix = Colors.cyan('[PAGINATION.JS]')+Colors.yellow('[getQueryString]');
        
        console.log(prefix, 'Method accessed')
        let queryString = [];
        console.log(prefix, 'Params receiveds in getquerystring:', params)
        for(let name in params){
            queryString.push(`${name}=${params[name]}`)
        }
        console.log(prefix, 'Querystring to be sent', queryString)
        console.log(prefix, 'Method return')
        return queryString.join('&')
    }

}

module.exports = Pagination;