var _a;
(_a = document
    .querySelector("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    var _a, _b;
    event.preventDefault();
    // Get references to the input elements
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    // Extract values from the inputs
    var email = (_a = emailInput === null || emailInput === void 0 ? void 0 : emailInput.value) !== null && _a !== void 0 ? _a : "";
    var pass = (_b = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value) !== null && _b !== void 0 ? _b : "";
    // Both email and password should not be empty
    if (!email || !pass) {
        alert("Please enter Email and Password.");
        return;
    }
    // Retrieve users from localStorage
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    // Find user in the list
    var user;
    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
        var u = users_1[_i];
        if (u.email === email) {
            user = u;
            break;
        }
    }
    // User data should exist in local storage
    if (!user) {
        alert("User not found. Please sign up.");
        return;
    }
    // Check if the password is correct
    if (user.pass === pass) {
        alert("Login successful!");
        window.location.href = "../index.html";
    }
    else {
        alert("Invalid password. Please try again.");
    }
});
