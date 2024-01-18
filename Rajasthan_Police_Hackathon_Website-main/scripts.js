// Get the modal elements
var reportModal = document.getElementById('reportModal');
var feedbackModal = document.getElementById('feedbackModal');
var successMessage = document.getElementById('successMessage'); // The success message container

// Get the buttons that open the modals
var reportBtn = document.getElementById("reportBtn");
var feedbackBtn = document.getElementById("feedbackBtn");

// Get the <span> elements that close the modals
var spans = document.getElementsByClassName("close");

// Event listeners for the buttons
reportBtn.onclick = function() {
  reportModal.style.display = "block";
}
feedbackBtn.onclick = function() {
  feedbackModal.style.display = "block";
}

// Close modals when <span> (x) is clicked
for (var i = 0; i < spans.length; i++) {
  spans[i].onclick = function() {
    this.parentElement.parentElement.style.display = "none"; // Close the specific modal
    successMessage.style.display = "none"; // Also hide success message if open
  }
}

// Close modals when clicking outside of them
window.onclick = function(event) {
  if (event.target == reportModal || event.target == feedbackModal) {
    event.target.style.display = "none"; // Close the specific modal
    successMessage.style.display = "none"; // Also hide success message if open
  }
}

// Function to show the success message
function showSuccessMessage() {
  successMessage.style.display = "block";
  successMessage.innerText = "Your submission has been successful!";
  // Hide the success message after 3 seconds
  setTimeout(function() {
    successMessage.style.display = "none";
  }, 3000);
}

// Attach submit event listeners to forms
document.getElementById('report-form').onsubmit = function(e) {
  e.preventDefault(); // Prevent actual form submission
  reportModal.style.display = "none"; // Close the report modal
  showSuccessMessage(); // Show the success message
}

document.getElementById('feedback-form').onsubmit = function(e) {
  e.preventDefault(); // Prevent actual form submission
  feedbackModal.style.display = "none"; // Close the feedback modal
  showSuccessMessage(); // Show the success message
}