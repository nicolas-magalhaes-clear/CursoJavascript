let celular = function(){
    let cor = 'prata';

    this.ligar = function(){
        console.log('Uma ligacao');
        return 'ligando';
    }

}

let objeto = new celular();
console.log(objeto);

let ligar = objeto.ligar();
console.log(ligar);

//Example class telephone

class telephone{

    constructor(){
        this.cor = "silver";
    }
    call(){
        console.log('A call');
        return('Calling');
    }

}
let object = new telephone()
let telephoneCall = object.call();
console.log(telephoneCall);