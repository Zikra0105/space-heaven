
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("consultationModal");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.getElementById("closeModal");

    // Show Modal
    openModalBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // Close Modal
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close Modal when clicking outside content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.getElementById("consultationForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        first_name: document.getElementById("first-name").value,
        last_name: document.getElementById("last-name").value,
        budget: document.getElementById("budget").value,
        email: document.getElementById("email").value,
        phone_number: document.getElementById("phone-number").value,
        country: document.getElementById("country").value,
        message: document.getElementById("message").value,
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/submit_form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to submit form. Please try again.");
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

