(() => {
  "use strict";

  const form = document.querySelector(".needs-validation");
  const alertContainer = document.getElementById("alert-container");
  const submitBtn = form.querySelector("button[type='submit']");

  submitBtn.disabled = true;

  const inputs = form.querySelectorAll("input, select, textarea");

  function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = "alert";
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    alertContainer.innerHTML = "";
    alertContainer.appendChild(alert);
  }

  function checkFormValidity() {
    submitBtn.disabled = !form.checkValidity();
  }

  inputs.forEach(input => {
    input.addEventListener("input", checkFormValidity);
    input.addEventListener("change", checkFormValidity);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      showAlert("danger", "Form submission failed. Please make sure all fields are filled correctly.");
      return;
    }

    const textarea = document.getElementById("exampleFormControlTextarea1");
    if (textarea.value.trim() === "") {
      showAlert("warning", "Please enter your message before submitting.");
      return;
    }

    showAlert("success", "Your message has been submitted successfully!");

    form.reset();
    form.classList.remove("was-validated");

    submitBtn.disabled = true;
  });
})();
