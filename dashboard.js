// window.onload = function () {

//     // Call the function
//     run();
// };
// document.addEventListener('DOMContentLoaded', function () {
//     run();
// });

run();

function run() {
    // alert("245");
    console.log('Page has fully loadeds');

    function onPageLoad() {
        let storedValue = localStorage.getItem('user');
        if (storedValue) {
            let userObject = JSON.parse(storedValue);
            // alert(userObject.first_name);
            const spanElement = document.getElementById("name");
            spanElement.textContent = userObject.first_name;
        } else {
            const spanElement = document.getElementById("name");
            spanElement.textContent = "No Name";


        }
    }

    // Call the function
    onPageLoad();
    // Your code here
};

