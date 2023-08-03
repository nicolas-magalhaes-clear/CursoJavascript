class CalcController{
    
    constructor(){
        this._operation = []
        this._locale = 'pt-br';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
        this.initButtonsEvents()
    }

    initialize(){
        
        this.setDisplayDateTime()
        setInterval(() => {
                this.setDisplayDateTime();
        }, 1000);
    }

    //Adicionar multiplos eventos a um elemento
    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event,fn, false);
        })
    }

    //Aplicar eventos aos botoes
    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        
        buttons.forEach(btn=>{
            this.addEventListenerAll(btn, 'click drag', (e) => {
                console.log(btn.className.baseVal.replace('btn-', ""));
            })
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            })
        })
        
    }


    //Changes time display value
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    setError(){
        this.displayCalc = 'Error';
    }
    clearAll(){
        this._operation = []
    }
    clearEntry(){
        this._operation.pop();
    }
    addOperation(value){
        this._operation.push(value)
    }
    execBtn(value){
        switch(value){

            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                
                break;
            case 'subtracao':
     
                break;
            case 'divisao':
     
                break;
            case 'multiplicacao':
     
                break;
            case 'porcento':
     
                break;
            case 'igual':
     
                break;
            default:
                this.setError();
            }
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