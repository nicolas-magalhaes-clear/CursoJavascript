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

