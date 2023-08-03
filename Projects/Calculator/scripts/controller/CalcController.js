class CalcController{
    
    constructor(){
        this._locale = 'pt-br';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
    }

    initialize(){
        
        this.setDisplayDateTime()
        setInterval(() => {
                this.setDisplayDateTime();
        }, 1000);
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    //Getter e setter displayTime
    get displayTime(){
        return this._timeEl.innerHTML;
    }
    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }

    //Getter e setter displayDate
    get displayDate(){
        return this._dateEl.innerHTML;
    }
    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    //Getter e setter displayCalc
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value
    }


    //Getter e setter currentDate
    get currentDate(){
        return new Date();
    }
    set currentDate(value){
        this._currentDate = value;
    }
}