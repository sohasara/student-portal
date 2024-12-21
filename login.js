// Login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Validate the login here (add your custom logic, if needed)
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();


  // const data = {
  //   username: Number(username),
  //   password: password
  // };
  // console.log(data);

  fetch('login.php')
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
      var i = 0;
      data.forEach(user => {

        //       Example: Simple validation
        if (username === user.stu_id && password === user.password) {
          i = 1;
          localStorage.clear();
          localStorage.setItem('user',JSON.stringify(user)); // Saves the username as stu_id

          // Navigate to the dashboard
          window.location.href = "index.html";

        }
      }

      );
      if (i == 0) {
        alert("Invalid username or password. Please try again.");

      }
    })
    .catch(error => {
      console.error('Error fetching data:', error)
      alert(error);
    });

});
