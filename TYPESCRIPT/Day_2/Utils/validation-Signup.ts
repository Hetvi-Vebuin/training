document.querySelector('form')?.addEventListener('submit', function (event: Event): void {
    event.preventDefault();
  
    // Define interface for User
    interface User {
      email: string;
      pass: string;
    }
  
    // Get references to the input elements
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement | null;
  
    // Extract values from the inputs
    const email = emailInput?.value ?? '';
    const pass = passwordInput?.value ?? '';
    const conPass = confirmPasswordInput?.value ?? '';
  
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
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  
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
    (this as HTMLFormElement).reset();
  });
  