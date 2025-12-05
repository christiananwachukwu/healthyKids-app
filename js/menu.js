// js/menu.js

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (menuBtn && navLinks) {
    // 1. Ensure the navigation starts hidden (in case the class isn't in the HTML)
    if (!navLinks.classList.contains("hidden")) {
      navLinks.classList.add("hidden");
    }

    // 2. Attach the click listener
    menuBtn.addEventListener("click", () => {
      // Toggles the 'hidden' class, which starts the CSS transition
      navLinks.classList.toggle("hidden");

      // Toggles the 'open' class for the hamburger icon rotation animation
      menuBtn.classList.toggle("open");
    });
  }
});
