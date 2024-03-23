document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registration-form");
  const modal = document.getElementById("myModal");
  const closeModalBtn = document.querySelector(".close");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    const formData = {
      id: form.querySelector("#id").value,
      fullname: form.querySelector("#fullname").value,
      phone: form.querySelector("#phone").value,
      email: form.querySelector("#email").value,
      role: form.querySelector("#role").value,
      username: form.querySelector("#username").value,
      password: form.querySelector("#password").value,
    };

    // Store data in an array (You can process this data as needed)
    const dataArray = [];
    dataArray.push(formData);

    // Show modal
    modal.style.display = "block";

    // Close modal when close button is clicked
    closeModalBtn.addEventListener("click", function () {
      modal.style.display = "none";
      window.location.href = "login.html";
    });

    // Close modal when user clicks outside of it
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        window.location.href = "login.html";
      }
    });

    form.reset();
  });
});
