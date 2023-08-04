/*
    We can add events to our elements using javascript

    list of available events:
    https://www.w3schools.com/js/js_events.asp


    Simple syntax:
    element.addEventListener('EVENT', (e) => {
        //FUNCTION
    })

Example:
*/

const div1 = document.querySelector('.div1');
div1.addEventListener('click', (e) => {
    console.log('I was clicked!');
})

/*
Important note, we can prevent the default event of an element using the
preventDefault()
For example, buttons have a native event of submite when clicked, soo by using prevent default allow us to
deny this action
*/

const buttonSelected = document.querySelector('#buttonDenied');
buttonSelected.addEventListener('click', (e) => {
    e.preventDefault();
})