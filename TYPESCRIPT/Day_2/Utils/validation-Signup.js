var _a;
(_a = document.querySelector('form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a, _b, _c;
    event.preventDefault();
    // Get references to the input elements
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirmPassword');
    // Extract values from the inputs
    var email = (_a = emailInput === null || emailInput === void 0 ? void 0 : emailInput.value) !== null && _a !== void 0 ? _a : '';
    var pass = (_b = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value) !== null && _b !== void 0 ? _b : '';
    var conPass = (_c = confirmPasswordInput === null || confirmPasswordInput === void 0 ? void 0 : confirmPasswordInput.value) !== null && _c !== void 0 ? _c : '';
    // All fields should not be empty
    if (!email || !pass || !conPass) {
        alert("Please enter Email, Password, and Confirm Password.");
        return;
    }
    // Password length validation
    if (pass.length < 8) {
        alert("Password length must be at least 8 characters.");
        return;
    }
    // Password match validation
    if (pass !== conPass) {
        alert("Password and Confirm Password do not match.");
        return;
    }
    // Retrieve existing users from local storage
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    // Check if the email is already registered
    if (users.some(function (user) { return user.email === email; })) {
        alert("Email already registered. Please log in.");
        return;
    }
    // Add new user to local storage
    users.push({ email: email, pass: pass });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please log in.");
    // Reset the form
    this.reset();
});
