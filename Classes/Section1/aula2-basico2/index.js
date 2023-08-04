/*
Funcoes, como usar
*/

//Tipos de funcoes
//Comum, anônima, e arrow function
//Comum pode chamar varias vezes, anonima nao pode ser chamada pelo nome.

//Funcao comum
function somar(valor1 , valor2){
    return valor1 + valor2;
}

let numero1;
let numero2;

let resultado = somar(numero1, numero2);

console.log(resultado);

//Funcao elaborada
function calc(x1, x2 , operador){
    return `${x1} ${operador} ${x2}`
}

(function(x1, x2, operador){
    return eval(`${x1} ${operador} ${x2}`)
})

//Adicionando eventos
window.addEventListener('focus', event => {
    console.log('Focado no documento');
})


//Datas
let agora = new Date()
console.log(agora)

//Arrays
let carro = 'Palio';


//Arrays armazenam multiplos valores de diversos tipos
let carros = ['Palio', 'Uno', 'Fiat', 'Saveiro', true, new Date(), function(){}]

//Posicao do terceiro elemento do array
console.log(carros[4]);

//Percorrendo um array
carros.forEach(function(value, index){
    //value é o elemento atual do array
    //index é o elemento numeral que representa a posicao do elemento
})


