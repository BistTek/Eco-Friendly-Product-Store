document.addEventListener("DOMContentLoaded", function () {
  const animateSections = document.querySelectorAll(".animate-section");

  function checkScroll() {
    animateSections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        section.classList.add("visible");
      }
    });
  }

  checkScroll();
  window.addEventListener("scroll", checkScroll);
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      let valid = true;

      this.querySelectorAll("[required]").forEach((input) => {
        if (!input.value.trim()) {
          input.classList.add("error");
          valid = false;
        } else {
          input.classList.remove("error");
        }
      });

      if (!valid) {
        e.preventDefault();
        this.querySelector(".error").focus();
      }
    });
  });
});
