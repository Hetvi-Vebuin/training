"use strict";
var _a;
(_a = document
    .querySelector("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const email = (emailInput === null || emailInput === void 0 ? void 0 : emailInput.value) || "";
    const pass = (passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value) || "";
    // Both email and password should be entered
    if (!email || !pass) {
        alert("Please enter Email and Password.");
        return;
    }
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // Find user in the list
    let user;
    for (const u of users) {
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
