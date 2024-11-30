// Simple authentication logic
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Simple hardcoded credentials
    if (username === "admin" && password === "password123") {
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "admin-dashboard.html";
    } else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "Invalid username or password.";
    }
});