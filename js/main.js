// js/main.js

// ----------- HAMBURGER MENU -----------
const menuBtn = document.getElementById("menu-btn");
const body = document.body;

// Toggle menu visibility
menuBtn?.addEventListener("click", () => {
    body.classList.toggle("menu-open");
});

// Close menu when clicking anywhere (mobile)
document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && body.classList.contains("menu-open")) {
        body.classList.remove("menu-open");
    }
});

// ----------- ACTIVE PAGE HIGHLIGHT -----------
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});