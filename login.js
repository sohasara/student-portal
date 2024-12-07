// Login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting
  
    // Validate the login here (add your custom logic, if needed)
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Example: Simple validation
    if (username === "student" && password === "1234") {
      // Navigate to the dashboard
      window.location.href = "index.html";
    } else {
        //   alert("Invalid username or password. Please try again.");
        window.location.href = "index.html";
    }
  });
  