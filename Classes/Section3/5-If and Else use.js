/*
We can use the conditionals, if and else to control the flux of our code, define wich block of the
code will be executed based on conditions

Example:
*/


let i = 0;

if(i > 10){
    console.log(i, "Bigger than 10")
}

/*
Else can be used to give another destiny to the other conditions
example
*/
else{
    console.log(i, "Isn't bigger than 10");
}

/*
    We can also use the structure
    if
    else if
    else
    to create more conditions 

    Example:
*/
let j = "apple";

if(j == 'lemon'){
    console.log("It's a lemon!")
} else if(j == 'pineapple'){
    console.log("It's a pineapple")
}
else{
    console.log('There is no condition for:', j);
}