"use strict";
var _a;
(_a = document.querySelector('form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const email = (emailInput === null || emailInput === void 0 ? void 0 : emailInput.value) || '';
    const pass = (passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value) || '';
    const conPass = (confirmPasswordInput === null || confirmPasswordInput === void 0 ? void 0 : confirmPasswordInput.value) || '';
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
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // Check if the email is already registered
    if (users.some((user) => user.email === email)) {
        alert("Email already registered. Please log in.");
        return;
    }
    // Add new user to local storage
    users.push({ email, pass });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please log in.");
    // Reset the form
    this.reset();
});
