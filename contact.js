// Handle Contact Form Submission
document.querySelector('.btn button').addEventListener('click', async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Get input values
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const contactNumber = document.getElementById("contact-number").value.trim();
  const subject = document.getElementById("contact-subject").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  // Validate inputs
  if (!name || !email || !contactNumber || !message) {
      alert("Please fill in all required fields before submitting.");
      return;
  }

  // Create data object
  const data = {
      name: name,
      email: email,
      contact_number: contactNumber,
      subject: subject || "No Subject", // Default if empty
      message: message,
  };

  try {
      // Send data to Flask backend
      const response = await fetch("http://127.0.0.1:5000/submit_contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
          alert(result.message); // Show success message

          // Clear the form fields
          document.getElementById("contact-name").value = "";
          document.getElementById("contact-email").value = "";
          document.getElementById("contact-number").value = "";
          document.getElementById("contact-subject").value = "";
          document.getElementById("contact-message").value = "";
      } else {
          alert("Error: " + result.message);
      }
  } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit contact form. Please try again.");
  }
});


  const faders = document.querySelectorAll('.fade-in-up');

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
