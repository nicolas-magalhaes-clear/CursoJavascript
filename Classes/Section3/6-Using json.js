/*
Json (Javascript object notation) is an data structure from javascript that allow us to storage
multiple data

his structure is viewed like this:

{
    dataType1: value,
    dataType2: value2
}


Example to how can we create a json
*/
function produceCoal(){
    console.log('Do nothing');
}

var cities = {
    amountPop: 80,
    numberOfHospitals: 10,
    cityName: 'Sao Paulo',
    hasBeach: false,
    defaultFunction: produceCoal() 
} 

//A json structure can hold multiple data types, like, strings, numbers, another arrays or even functions

//We can fill ou json not only defining its values, but also using loops, or values taken from HTML documents
var user = {}
const arrayPeoples = ['Lucas', 'Renata', 'Joe']

arrayPeoples.forEach((people)=>{
    user['name'] = people;
})


