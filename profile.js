profile();

function profile() {
    let storedValue = localStorage.getItem('user');
    if (storedValue) {
        let userObject = JSON.parse(storedValue);

        var data = { stu_id: userObject.stu_id };

        fetch('profile.php',
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
                    const elements = document.getElementsByClassName("prof1");
                    elements[0].textContent = user.stu_name;
                    elements[1].textContent = user.stu_id;
                    elements[2].textContent = user.program;
                    elements[3].textContent = user.batch;
                    elements[4].textContent = user.contact;

                    elements[5].textContent = user.fathers_name;
                    elements[6].textContent = user.fathers_pro;
                    elements[7].textContent = user.mothers_name;
                    elements[8].textContent = user.mothers_pro;

                    elements[9].textContent = user.dob;
                    elements[10].textContent = user.religion;
                    elements[11].textContent = user.gender;
                    elements[12].textContent = user.nationality;

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