// ==================== MOBILE NAVIGATION ====================

const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const menuIcon = document.querySelector(".menu-icon");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("nav-open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  // Close the mobile menu when a navigation link is clicked
  const navLinks = mainNav.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("nav-open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    });
  });

  // Close the menu when clicking outside it
  document.addEventListener("click", (event) => {
    const clickedInsideNav = mainNav.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (
      !clickedInsideNav &&
      !clickedMenuButton &&
      mainNav.classList.contains("nav-open")
    ) {
      mainNav.classList.remove("nav-open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    }
  });
}


// ==================== SCROLL REVEAL ====================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // Stop observing once the element has appeared
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  // Fallback for browsers without IntersectionObserver
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}


// ==================== KEYBOARD ACCESSIBILITY ====================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mainNav?.classList.contains("nav-open")) {
    mainNav.classList.remove("nav-open");

    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open menu");

    menuButton?.focus();
  }
});