class CalcController{
    
    constructor(){
        this._displayCalc = "";
        this._currentDate;

        this.initialize();
    }

    initialize(){
        let displayCalcE1 = document.querySelector('#display');
        let dateE1 = document.querySelector('#data');
        let timeE1 = document.querySelector('#hora');
    }
    get displayCalc(){
        return this._currentDate}
    set displayCalc(valor){
        this._displayCalc = _currentDate}

    get dataAtual(){
        return this._dataAtual;
    }
    set dataAtual(valor){
        this._dataAtual = valor;
    }
}