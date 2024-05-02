function validateForm() {
  var username = document.forms["loginForm"]["username"].value;

  // Check if the username is incorrect
  if (username !== "vicky") {
    document.getElementById("usernameErrorMessage").classList.remove("d-none");
    showToast();
    return false; // Prevent form submission
  }
  return true; // Allow form submission
}
function showToast() {
  var toast = document.getElementById("toast");
  toast.classList.add("show");

  // Automatically hide the toast after 3 seconds
  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}
