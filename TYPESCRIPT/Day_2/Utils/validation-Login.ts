document
  .querySelector("form")
  ?.addEventListener("submit", function (event: Event): void {
    event.preventDefault();

    const emailInput = document.getElementById(
      "email"
    ) as HTMLInputElement | null;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement | null;

    const email = emailInput?.value || "";
    const pass = passwordInput?.value || "";

    // Both email and password should be entered
    if (!email || !pass) {
      alert("Please enter Email and Password.");
      return;
    }

    // Retrieve users from localStorage
    const users: { email: string; pass: string }[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    // Find user in the list
    let user: { email: string; pass: string } | undefined;

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
    } else {
      alert("Invalid password. Please try again.");
    }
  });
