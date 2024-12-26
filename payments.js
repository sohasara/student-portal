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
                    } else {
                        elements[4].textContent = 0;
                        elements[5].textContent = i;
                    }
                    var array = [user.first, user.second, user.third];
                    var payble =[];
                    if(user.total_bill - user.total_paid <= 0){
                        payble = [0,0,0];
                    }else{
                        var j = user.total_bill - user.total_paid;

                        if(j<=user.total_bill/3){
                            payble = [0,0,j];
                        }else{
                            payble[2]=user.total_bill/3;
                            j = j- user.total_bill/3;
                            if(j<=user.total_bill/3){
                                payble[1]=j;
                                payble[0]=0;
                            }else{
                                payble[1]=j;
                                j = j- user.total_bill/3;
                                payble[0]=j;
                            }

                        }

                    }
                    const tableBody = document.getElementById('t');
                    for (var i = 0; i < 3; i++) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                        <td>${i+1}</td>
                        <td>${i+1} Installment</td>
                        <td>${array[i]}</td>
                        <td>${user.total_bill/3}</td>
                        <td>${payble[i]}</td>
                        <td>${(new Date() > new Date(array[i])) ? (payble[i] != 0) ? 500:0:0}</td>
                       
                    `;
                        tableBody.appendChild(row);
                    }


                    console.log(array);
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