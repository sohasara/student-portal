
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar ul li a");
  const contentContainer = document.getElementById("content-container");

  // Load default dashboard content
  loadPage("dashboard.html");

  // Event listener for menu links
  links.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Handle logout separately
      if (link.id === "logout") {
        // Redirect to login page
        window.location.href = "login.html";
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
    fetch(page)
      .then(response => response.text())
      .then(data => {
        contentContainer.innerHTML = data;
      })
      .catch(error => {
        contentContainer.innerHTML = "<p>Error loading page.</p>";
        console.error("Error:", error);
      });
  }
});
