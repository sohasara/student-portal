document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar ul li a");
  const contentContainer = document.getElementById("content-container");
  const loadingIndicator = document.getElementById("loading-indicator");

  // Load default dashboard content
  loadPage("dashboard.html");

  // Event listener for menu links
  links.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Handle logout separately
      if (link.id === "logout") {
        // Show loading indicator
        loadingIndicator.style.display = "flex";

        // Simulate delay and redirect to login page
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500); // Adjust the delay as needed
        return;
      }

      // Remove active class from all links
      links.forEach(item => item.classList.remove("active"));

      // Add active class to the clicked link
      event.target.classList.add("active");

      // Load the corresponding content file
      const page = event.target.getAttribute("href");
      loadPage(page);
    });
  });

  // Function to load content into the container
  function loadPage(page) {
    console.log(`Loading page: ${page}`);

    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${page}: ${response.statusText}`);
            }
            return response.text();  // Extract the HTML as text
        })
        .then(data => {
            // Inject the fetched HTML content into the page
            contentContainer.innerHTML = data;
            console.log("HTML Content loaded into container.");

            const scriptPath = page.replace(".html", ".js");  // Create the corresponding JS path
            console.log(`Loading script: ${scriptPath}`);
            loadScript(scriptPath);  // Load the JavaScript file
        })
        .catch(error => {
            contentContainer.innerHTML = "<p>Error loading page.</p>";
            console.error("Error:", error);
        });
}


  // Function to load the JavaScript for the page dynamically
  function loadScript(scriptPath) {
    const script = document.createElement("script");
    script.src = scriptPath;  // Ensure the path to the JS file is correct

    // Log to verify the script load
    script.onload = () => {
        console.log(`${scriptPath} loaded successfully.`);
    };

    script.onerror = () => {
        console.error(`Error loading script: ${scriptPath}`);
    };

    document.body.appendChild(script);  // Append the script tag to the body to load the JS
}

});