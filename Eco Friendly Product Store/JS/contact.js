document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
      _replyto: document.getElementById("email").value,
      _subject: `New message from ${document.getElementById("name").value} - ${
        document.getElementById("subject").options[
          document.getElementById("subject").selectedIndex
        ].text
      }`,
    };

    const statusElement = document.getElementById("form-status");
    statusElement.textContent = "Sending your message...";
    statusElement.className = "status-pending";
    fetch("https://formspree.io/f/your-form-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        statusElement.textContent =
          "Message sent successfully! We'll get back to you soon.";
        statusElement.className = "status-success";
        contactForm.reset();
      })
      .catch((error) => {
        statusElement.textContent =
          "There was an error sending your message. Please try again later or email us directly at info@eco-friendlyproducts.com.";
        statusElement.className = "status-error";
        console.error("Error:", error);
      });
  });

  const inputs = contactForm.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (this.checkValidity()) {
        this.classList.remove("error");
      }
    });

    input.addEventListener("invalid", function () {
      this.classList.add("error");
    });
  });
});
