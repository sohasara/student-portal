payment();

function payment() {
    let storedValue = localStorage.getItem('user');
    if (storedValue) {
        let userObject = JSON.parse(storedValue);

        var data = { stu_id: userObject.stu_id };

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
                    const elements = document.getElementsByClassName("pay1");
                    elements[0].textContent = user.total_fee;
                    elements[1].textContent = user.discount;
                    elements[2].textContent = user.total_bill;
                    elements[3].textContent = user.total_paid;

                    var i = user.total_bill - user.total_paid;

                    if (i > 0) {
                        elements[4].textContent = i;
                        elements[5].textContent = 0;
                    }else{
                        elements[4].textContent = 0;
                        elements[5].textContent = i;
                    }

                    console.log(JSON.stringify(user));

                }

                );

            })
            .catch(error => {
                console.error('Error fetching data:', error)
                alert(error);
            });
    } else {
        alert("Not found ID");


    }
}