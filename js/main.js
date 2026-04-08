document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     MOBILE MENU TOGGLE
  ========================= */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    // Close mobile menu after clicking a nav link
    document.querySelectorAll("#navLinks a").forEach(link => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
      });
    });
  }

  /* =========================
     SMOOTH SCROLL
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        const navbarOffset = 75;
        const targetPosition = target.offsetTop - navbarOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  /* =========================
     TYPING ANIMATION
  ========================= */
  const typingText = document.getElementById("typing-text");

  if (typingText) {
    const roles = [
      "Digital Marketer & Digital Planner",
      "Media Buying Specialist",
      "Social Media Marketing Professional",
      "Performance Marketing Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex--);
      } else {
        typingText.textContent = currentRole.substring(0, charIndex++);
      }

      if (!isDeleting && charIndex === currentRole.length + 1) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }

      setTimeout(typeEffect, isDeleting ? 40 : 80);
    }

    typeEffect();
  }

  /* =========================
     REVEAL ON SCROLL
  ========================= */
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    revealElements.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run once on load

  /* =========================
     ACTIVE NAV LINK ON SCROLL
  ========================= */
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll("#navLinks a");

  function updateActiveNav() {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach(link => {
      link.classList.remove("active-link");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active-link");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  /* =========================
     PROJECT MODAL
  ========================= */
  const modal = document.getElementById("projectModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const projectCards = document.querySelectorAll(".open-modal");

  if (modal && modalOverlay && modalClose && modalImage && modalTitle && modalDesc) {
    projectCards.forEach(card => {
      card.addEventListener("click", function () {
        const title = this.getAttribute("data-title");
        const image = this.getAttribute("data-image");
        const desc = this.getAttribute("data-desc");

        modalTitle.textContent = title || "";
        modalImage.src = image || "";
        modalDesc.textContent = desc || "";

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    function closeModal() {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }

    modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  }

  /* =========================
     STATS COUNT ANIMATION
  ========================= */
  const statNumbers = document.querySelectorAll(".stat-card h3");

  function animateCounter(el) {
    const rawText = el.textContent.trim();
    const numberOnly = parseInt(rawText.replace(/\D/g, ""), 10);

    if (!numberOnly || el.dataset.counted === "true") return;

    el.dataset.counted = "true";

    let current = 0;
    const increment = Math.max(1, Math.ceil(numberOnly / 60));
    const suffix = rawText.includes("+") ? "+" : "";

    function updateCount() {
      current += increment;
      if (current < numberOnly) {
        el.textContent = current + suffix;
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = numberOnly + suffix;
      }
    }

    updateCount();
  }

  function handleCounterOnScroll() {
    statNumbers.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        animateCounter(el);
      }
    });
  }

  window.addEventListener("scroll", handleCounterOnScroll);
  handleCounterOnScroll();

  /* =========================
     NAVBAR SCROLL EFFECT
  ========================= */
  const navbar = document.querySelector(".navbar");

  function navbarEffect() {
    if (!navbar) return;

    if (window.scrollY > 20) {
      navbar.style.background = "rgba(0,0,0,0.88)";
      navbar.style.backdropFilter = "blur(14px)";
    } else {
      navbar.style.background = "rgba(0,0,0,0.75)";
      navbar.style.backdropFilter = "blur(12px)";
    }
  }

  window.addEventListener("scroll", navbarEffect);
  navbarEffect();
});