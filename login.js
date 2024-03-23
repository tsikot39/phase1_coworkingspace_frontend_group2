document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Sample user data array
    var users = [
      { username: "John", password: "password1", role: "owner" },
      { username: "Paula", password: "password2", role: "coworker" },
      { username: "user3", password: "password3", role: "owner" },
      // Add more sample users as needed
    ];

    // Get username and password values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Perform login authentication
    var authenticatedUser = users.find(function (user) {
      return user.username === username && user.password === password;
    });

    if (authenticatedUser) {
      console.log("Login successful!");
      console.log("Username:", authenticatedUser.username);
      console.log("Role:", authenticatedUser.role);

      // Store authenticated user's information in local storage
      localStorage.setItem("loggedInUser", JSON.stringify(authenticatedUser));

      // Redirect based on role
      if (authenticatedUser.role === "owner") {
        window.location.href = "owner-property-list.html";
      } else {
        window.location.href = "coworker.html";
      }
    } else {
      // Display error message on login form
      var errorMessageElement = document.getElementById("error-message");
      errorMessageElement.innerText =
        "Login failed. Please check your username and password.";
    }
  });
