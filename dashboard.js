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
            var data ={ stu_id:userObject.stu_id};

            fetch('payments.php',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data), // Send stu_id as JSON
        })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errorData => {
                            // Show the error message in an alert box
                            // alert('Error: ' + errorData.error);
                            // Throw an error that will be caught in the catch block
                            throw new Error(errorData.error);  // This will trigger the catch block
                        });
                    }
                    return response.json();  // Return the data if successful
                })
                .then(data => {
                    
                    data.forEach(user => {
                        const elements = document.getElementsByClassName("p1");
                        elements[0].textContent= user.total_bill;
                        elements[1].textContent = user.total_paid;
                        elements[2].textContent = user.total_bill - user.total_paid;
                        localStorage.setItem("hi",JSON.stringify(user));
                        console.log(user.total_fee);
                        
                    }

                    );
           
                })
                .catch(error => {
                    console.error('Error fetching data:', error)
                    alert(error);
                });
        } else {
            const spanElement = document.getElementById("name");
            spanElement.textContent = "No Name";


        }

    }

    // Call the function
    onPageLoad();
    // Your code here
};

