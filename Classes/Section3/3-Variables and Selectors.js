/*We can separate our code throught variavles, to reduce the browser process (better performance)

Example
*/

var nameInput = querySelector('#nameInput');

/*
Its better to use a variable because the browser saves a piece of memory to know where this element is
And does not need anymore to search all the document to find it again
*/

//The querySelector and querySelectorAll can be used with any CCS3 selector like: 
"input name['name']"
".className"
"#id"