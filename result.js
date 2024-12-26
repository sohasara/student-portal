result1();
result2();

function result1() {
    let storedValue = localStorage.getItem('user');
    if (storedValue) {
        let userObject = JSON.parse(storedValue);

        var data = { stu_id: userObject.stu_id };

        fetch('result1.php',
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
                const tableBody = document.getElementById("t1");
                data.forEach(user => {
                    const row = document.createElement('tr');
                        row.innerHTML = `
                        <td>${user.Semester}</td>
                        <td>${(user.Total_Points_Sum/user.Total_Credits).toFixed(2)}</td>
                        <td>${user.Total_Credits}</td>
                                               
                    `;
                        tableBody.appendChild(row);
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

function result2() {
    let storedValue = localStorage.getItem('user');
    if (storedValue) {
        let userObject = JSON.parse(storedValue);

        var data = { stu_id: userObject.stu_id };

        fetch('result2.php',
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

                const tableBody = document.getElementById("t2");
                data.forEach(user => {
                    const row = document.createElement('tr');
                        row.innerHTML = `
                        <td>${user.Semester}</td>
                        <td>${user.Course_Code}</td>
                        <td>${user.Course_Title}</td>
                        <td>${user.Grade}</td>
                        <td>${user.Credit}</td>
                        <td>${user.Point}</td>                       
                    `;
                        tableBody.appendChild(row);
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