// js/profile.js
import { saveData, loadData } from "./storage.js";

// DOM elements
const form = document.getElementById("profileForm");
const nameInput = document.getElementById("childName");
const ageInput = document.getElementById("childAge");
const displaySection = document.getElementById("profileDisplay");
const displayName = document.getElementById("displayName");
const displayAge = document.getElementById("displayAge");

// KEY for storage
const PROFILE_KEY = "healthyKidsProfile";

// Load existing profile on page load
document.addEventListener("DOMContentLoaded", () => {
  const profile = loadData(PROFILE_KEY);

  if (profile) {
    // Put values in display section
    displayName.textContent = profile.name;
    displayAge.textContent = profile.age;

    displaySection.style.display = "block";
    form.style.display = "none";
  }
});

// Save profile when form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const age = Number(ageInput.value);

  if (!name || !age) {
    alert("Please enter both name and age.");
    return;
  }

  const profileData = { name, age };

  // Save to localStorage
  saveData(PROFILE_KEY, profileData);

  // Update UI
  displayName.textContent = name;
  displayAge.textContent = age;

  form.style.display = "none";
  displaySection.style.display = "block";
});