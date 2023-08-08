/*

Session storage is a way to storage data in the browser, this enable the user to navigate throught different sites
Maintaining the window open, he can access anytime to get this values, soo it allows the developer to create custom areas

Local storage its the same as session storage, but instead of using the browser to get the values, local storage puts the data
inside of the harddrive, loading it everytime it is needed, allowing the user to close the tab and reopen it again with the same
data before


Example how to use session storage:
*/
sessionStorage.setItem("NAME_ELEMENT", "JSON_ELEMENT_STRINGIFYED")
//sessionStorage.setItem("users", JSON.stringify(users));


//Example local storage
localStorage.setItem("NAME_ELEMENT", "JSON_ELEMENT_STRINGIFYED")
//localStorage.setItem("users", JSON.stringify(users));